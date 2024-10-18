const eventNames = [
    'ROUTER:LOGOUT', 
    'ROUTER:LOGIN',
    'API:UN_AUTH', 
    'API:INVALID', 
    'API:ERROR',
];
type EventNames = (typeof eventNames)[number];
const getEmitter = (eventNames: EventNames[]) => {
    const emitter:Record<string, Set<Function>> = {}
    for(let i = 0; i < eventNames.length; i++) {
        emitter[eventNames[i]] = new Set();
    }
    return emitter
}
class EventEmitter {
    private listeners: Record<string, Set<Function>> = getEmitter(eventNames)
    on(eventName: EventNames, listener: Function) {
        const length = this.listeners[eventName].size;
        if (length < 1) {
            this.listeners[eventName].add(listener)
        } else {
            this.listeners[eventName].clear()
            this.listeners[eventName].add(listener)
        }
    }
    emit(eventName: EventNames, ...args: any[]) {
        this.listeners[eventName].forEach(listener => listener(...args))
    }
}

export const emitter = new EventEmitter()