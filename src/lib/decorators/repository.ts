import { Inject, Container } from "typedi";
import { getCustomRepository, ObjectType } from "typeorm";

export function InjectRepository<T>(repository: ObjectType<T>): Function {
    Container.set({ id: repository.name, factory: () => getCustomRepository(repository) });
    return Inject(repository.name);
}
