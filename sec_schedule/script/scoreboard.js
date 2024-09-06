async function load_scoreboard(){
    __load_scoreboard().then(
        () => {
            document.getElementById("loading_alert").style.display = 'none'
        }
    )
}

async function __load_scoreboard(){
    let scoreboard = document.getElementById("scoreboard_entries")
    
    fetch('./scoreboard.json')
    .then((res) => {return res.json();})
    .then((scoreboard_entries) => {
        for(let i = 0; i < scoreboard_entries.length; i++){
            let scoreboard_entry = scoreboard_entries[i]
            let table_entry_container = document.createElement("tr");
            
            // 创建 project 名称
            let project_name_container = document.createElement("td");
            let project_name = document.createElement("div");
            let project_link = document.createElement("a");
            project_name.setAttribute("class", "div_project_title")
            if(scoreboard_entry.record_url == ""){
                project_name.innerHTML = `${scoreboard_entry.project}`
            } else {
                project_link.setAttribute("href", `${scoreboard_entry.record_url}`)
                project_link.innerHTML = `${scoreboard_entry.project}`
                project_name.append(project_link)
            }
            
            project_name_container.append(project_name)
            table_entry_container.append(project_name_container)
            
            // 创建 State
            let state_container = document.createElement("td");
            let state_align_container = document.createElement("div");
            state_align_container.setAttribute("align", "center")
            let state = document.createElement("div");
            if(scoreboard_entry.state == "open"){
                state.setAttribute("class", "div_state_open")
                state.innerHTML = "OPEN"
            }else if(scoreboard_entry.state == "hold"){
                state.setAttribute("class", "div_state_hold")
                state.innerHTML = "HOLD"
            }
            state_align_container.append(state)
            state_container.append(state_align_container)
            table_entry_container.append(state_container)
            
            // 创建 更新日期
            let updated_date_container = document.createElement("td");
            let updated_date = document.createElement("div");
            updated_date.setAttribute("class", "div_created_date")
            updated_date.innerHTML = `${scoreboard_entry.update_time}`
            updated_date_container.append(updated_date)
            table_entry_container.append(updated_date_container)

            // 创建 开始日期
            let created_date_container = document.createElement("td");
            let created_date = document.createElement("div");
            created_date.setAttribute("class", "div_created_date")
            created_date.innerHTML = `${scoreboard_entry.create_time}`
            created_date_container.append(created_date)
            table_entry_container.append(created_date_container)
            
            scoreboard.append(table_entry_container)
        }
    })


}