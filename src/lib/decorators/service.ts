import Container, { Inject, ObjectType } from "typedi";

export function InjectService<T>(service: ObjectType<T>) {
    // if (!Container.has(service.name))
    //     Container.set({ id: service.name, value: () => new service() });
    return Inject(type => service);
}
