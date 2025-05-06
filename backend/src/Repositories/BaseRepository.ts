export class BaseRepository {
    constructor(private Model: any) {

    }

    async findByid(id:string){
        
        return await this.Model.findOne({_id:id})
    }}
