import { typeproject } from "../model/lgtd/projects.type";
import { sampleProjects, sampleTasks } from "./SampleDatas";


export const getAllPorjects= async (user_id: string) => {
    return sampleProjects;
};

export const  getProjectTasks = async (user_id: string , project_id :number) => {
    // console.log(project_id.toString())
    // console.log(sampleTasks.filter((value)=>value.project_id===project_id))
    return sampleTasks.filter((value)=>value.project_id===project_id);
};

export const  getAllTasks = async (user_id: string) => {
    return sampleTasks;
};

export const addNewProject = async (user_id:string , newvalue:string)=>{


}
export const addNewTask = async (user_id:string , newvalue:string , project_id:number)=>{

}
