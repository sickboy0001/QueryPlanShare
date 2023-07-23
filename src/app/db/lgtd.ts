import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import moment from 'moment'

const supabase = createServerComponentClient<Database>({ cookies });


export const selectAllPorjects = async(user_id: string)=>{
    const result = await supabase.from("projects").select("*")
        .eq("user_id",user_id)
        .order('created_at',  {ascending: true });
    return result.data;
}

export const selectTasks= async(user_id: string,project_id:number)=>{
    const result = await supabase.from("tasks").select("*")
        .eq("user_id",user_id)
        .eq("project_id",project_id)
        .order('created_at',  {ascending: true });
    return result.data;
}

export const insertProject = async(user_id:string , title:string)=>{
    // const localDate = new Date(cur_date.toLocaleString());
    console.log(`insertProject = async(user_id:${user_id} contents:${title})`)
    const { data, error } = await supabase
        .from('projects')
        .insert([
            { user_id: user_id ,title: title},
        ]).select()
    return data
}

export const insertTask = async(user_id:string ,project_id:number, title:string | null)=>{
    // const localDate = new Date(cur_date.toLocaleString());
    console.log(`insertTask = async(user_id:${user_id} contents:${title})`)
    const { data, error } = await supabase
        .from('tasks')
        .insert([
        { user_id: user_id ,project_id: project_id ,title: title}
        ])
        .select();


        return data;

}
    //   taget_name TEXT  NOT NULL,
    //   target_id  integer  NOT NULL,
    //   target_id_order TEXT  NOT NULL,
    
export const selectTargetOrders = async(user_id:string , target_name : string , target_id :number)=>{

    //select 
    const { data, error }  = await supabase.from("target_orders").select("*")
    .eq("user_id",user_id)
    .eq("target_name",target_name)
    .eq("target_id",target_id)

    return data

    
}
export const updateTargetOrders = async(user_id:string , target_name : string , target_id :number,target_id_order:string)=>{

    //select 
    const { data, error }  = await supabase.from("target_orders")
    .update({ target_id_order: target_id_order })
    .eq("user_id",user_id)
    .eq("target_name",target_name)
    .eq("target_id",target_id)
    return data


            
}

    export const insertTargetOrders = async(user_id:string , target_name : string , target_id :number,target_id_order:string)=>{
        //select 
        const { data, error }  = await supabase.from("target_orders")
        .insert([{
            user_id:user_id, target_name: target_name,target_id:target_id,target_id_order:target_id_order
        }])
        .select()
        return data
    }


    export const updateTaskArchive = async(id :number,archive:boolean)=>{
        const { data, error }  = await supabase.from("tasks")
        .update({ is_archive: archive })
        .eq("id",id)
        return data
    }
        

    export const updateTaskDone = async(id :number,done:boolean)=>{
        const state = done?"done":"nodone"
        const done_at = done?moment().format('YYYY-MM-DD'):""
        const { data, error }  = await supabase.from("tasks")
        .update({ state: state , done_at:done_at})
        .eq("id",id)
        return data
    }

    export const updateProjectArchive = async(id :number,archive:boolean)=>{
        const { data, error }  = await supabase.from("projects")
        .update({ is_archive: archive })
        .eq("id",id)
        return data
    }
        

    export const updateProjectDone = async(id :number,done:boolean)=>{
        const state = done?"done":"nodone"
        const { data, error }  = await supabase.from("projects")
        .update({ state: state })
        .eq("id",id)
        return data
    }

//     if (error) {
//     // refresh tokenが無効な場合、エラーをログに記録し、ユーザーにログインしてもらうよう促します。
//         console.error(error);
//         alert("ログインしてください。");
//     } else {
//         return {data,error}
//     }
// }

// export const updateGoodThingThing=async (id:number , thing :Text)=>{
//     console.log(`updateGoodThingThing:${id}:${thing}`)
//     //2023-05-22 07:16:40.904367+09
//     console.log(new Date().toString())
    
//     const { data, error } = await supabase
//     .from('three_good_things')
//     .update(
//             { contents: String(thing), updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
//             )
//         .eq
//         ( "id", id )
//     if(error!==null){
//         console.log(error)

//     }
//     return {data,error}
    
// }
// export const updateGoodThingArchived = async(id:number)=>{
//     console.log(`updateGoodThingArchived:${id}`)
//     const { data, error } = await supabase
//     .from('three_good_things')
//     .update(
//             { is_archived: true, updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
//             )
//         .eq
//         ( "id", id )

//     return {data,error}
// }

