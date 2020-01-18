import { Service } from "typedi";
import { InjectRepository } from "../../lib";
import { MechRepository } from "./mech.repository";
import { ListArgs, MechPaginationResult } from "../../@types";

@Service()
export class MechService {
    constructor(
        @InjectRepository(MechRepository) private readonly mechRepository: MechRepository
    ) {}

    getMech(id: string) {
        return this.mechRepository.findOne(id);
    }

    async getMechs(args: ListArgs) {
        const { page = 1, limit = 10, filter = "" } = args;
        const mechs = await this.mechRepository.findMechs(limit, page, filter);
        return { list: mechs[0], count: mechs[1] } as MechPaginationResult;
    }
}
