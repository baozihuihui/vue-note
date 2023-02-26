let activeEffect;
const effecStatck = [];
const buket = new WeakMap();
const track = (target, key) => {
    if (!activeEffect) return;
    let target_map = buket.get(target);
    if (!target_map) {
        target_map = new Map();
        buket.set(target, target_map);
    }
    let effectFns = target_map.get(key);
    if (effectFns) {
        effectFns.add(activeEffect);
    } else {
        effectFns = new Set();
        effectFns.add(activeEffect);
        target_map.set(key, effectFns)
    }
    activeEffect.deps.push(effectFns);
}

const trigger = (target, key) => {
    const target_map = buket.get(target);
    if (target_map) {
        const effectFns = target_map.get(key);
        if (effectFns) {
            const effectFnToRuns = new Set();
            effectFns.forEach(effectFn => {
                if (effectFn !== activeEffect) {
                    effectFnToRuns.add(effectFn);
                }
            })
            effectFnToRuns.forEach((effectFn) => {
                if (typeof effectFn.option.schudler === "function") {
                    effectFn.option.schudler(effectFn);
                } else {
                    effectFn();
                }
            })
        }
    }
}


const reactive = (data) => {
    const proxyData = new Proxy(data, {
        set(target, key, newValue) {
            target[key] = newValue;
            trigger(target, key);
        },
        get(target, key) {
            track(target, key);
            return target[key];
        }
    });
    return proxyData;
}

const cleanEffect = (effectFn) => {
    effectFn.deps.forEach((dep, index) => {
        dep.delete(effectFn);
    });
    effectFn.deps.length = 0;
}

const effect = (fn, option = { lazy: false }) => {
    const effectFn = () => {
        cleanEffect(effectFn);
        activeEffect = effectFn;
        effecStatck.push(activeEffect);
        const result = fn();
        effecStatck.pop();
        activeEffect = effecStatck[effecStatck.length - 1];
        return result
    }
    effectFn.option = option;
    effectFn.deps = [];
    if (!option.lazy) {
        effectFn();
    }
    return effectFn
}

const computed = (fn) => {
    let value, dirty = true;
    const effectfn = effect(fn, {
        lazy: true,
        schudler: () => {
            if (!dirty) {
                dirty = true;
                trigger(result, 'value');
            }
        }
    });
    const result = {
        get value() {
            if (dirty) {
                value = effectfn();
                dirty = false;
            }
            track(result, 'value');
            return value;
        }
    }

    return result;
};

const data = reactive({ a: 1, b: 2 });
const computed1 = computed(() => {
    let result = data.a <= 1 ? data.a + data.b : data.a;
    console.log(`computed1 result is ${result}`);
    return result;
});
const computed2 = computed(() => {
    const result = computed1.value + data.b;
    console.log(`computed2 result is ${result}`);
    return result;
});

effect(()=>{
    console.log(`watch ${computed1.value}`)
})

data.a = 2;
data.b = 5;
data.a = 1;
data.b = 6;
console.log(computed2.value)