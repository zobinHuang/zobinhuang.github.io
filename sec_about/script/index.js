async function load_page(){
    _load_projects();
}

async function _load_projects(){
    // 获取本文 project.json
    fetch('./script/projects.json')
    .then((res) => {return res.json();})
    .then((project_entries) => {
        let project_block = document.getElementById("project_block")
        let project_block_title = document.getElementById("project_block_title")

        // create button group in project_block_title
        let btn_group = document.createElement("div")
        btn_group.setAttribute("class", "btn_group")
        project_block_title.append(btn_group)

        for(let i=0; i<project_entries.length; i++){
            let project_class = project_entries[i]

            // create button in button group
            let btn = document.createElement("button")
            btn.setAttribute("id", `btn_${project_class.short}`)
            btn.setAttribute("onclick", "selectProjectClass(id);")
            btn.innerHTML = `${project_class.name}`
            if(i == 0){ btn.setAttribute("style", "color:#FFDC00;") }
            btn_group.append(btn)

            // create project class block
            let project_class_block = document.createElement("div")
            project_class_block.setAttribute("id", `${project_class.short}`)
            if(i != 0){ project_class_block.setAttribute("style", "display:none;") }
            project_block.append(project_class_block)

            // insert project
            for(let j=0; j<project_class.list.length; j++){
                // obtain project from the list
                let project = project_class.list[j]

                // create container
                let project_container = document.createElement("project_container")
                project_container.setAttribute("class", "project_container")
                project_class_block.append(project_container)

                // create pic container if need pic
                if(project.img_src !== ""){
                    let project_pic_container = document.createElement("div")
                    project_pic_container.setAttribute("class", "project_pic_container")
                    let img = document.createElement("img")
                    img.setAttribute("src", project.img_src)
                    project_pic_container.append(img)
                    project_container.append(project_pic_container)
                }

                // create outer title & content container
                let project_title_content_container = document.createElement("div")
                project_title_content_container.setAttribute("class", "project_title_content_container")
                project_container.append(project_title_content_container)

                // create title container
                let title_container = document.createElement("h4")
                project_title_content_container.append(title_container)

                // create title link
                let title_link = document.createElement("a")
                title_link.setAttribute("href", project.link)
                title_link.innerHTML = project.name
                title_container.append(title_link)

                // create title tags
                for(let k=0; k<project.tags.length; k++){
                    let tag = document.createElement("tag")
                    tag.innerHTML = `${project.tags[k]}`
                    title_container.append(tag)
                }

                // create intro container
                let project_intro_container = document.createElement("div")
                project_intro_container.setAttribute("class", "project_intro")
                project_title_content_container.append(project_intro_container)

                // insert intro
                let project_intro = document.createElement("p")
                project_intro.innerHTML = `${project.brief}`
                project_intro_container.append(project_intro)
            }
        }
    })
}

function selectProjectClass(id){
    let project_dc_network = document.getElementById('project_dc_network');
    let project_mlsys = document.getElementById('project_mlsys');
    let project_embeded = document.getElementById('project_embeded');
    let btn_project_dc_network = document.getElementById('btn_project_dc_network');
    let btn_project_mlsys = document.getElementById('btn_project_mlsys');
    let btn_project_embeded = document.getElementById('btn_project_embeded');
    if(id === "btn_project_dc_network"){
        // switch div
        project_dc_network.style.display="block";
        project_mlsys.style.display="none";
        project_embeded.style.display="none";
        // set button style
        btn_project_dc_network.style.color="#FFDC00"
        btn_project_mlsys.style.color="#ffffff"
        btn_project_embeded.style.color="#ffffff"
    } else if(id === "btn_project_mlsys"){
        // switch div
        project_dc_network.style.display="none";
        project_mlsys.style.display="block";
        project_embeded.style.display="none";
        // set button style
        btn_project_dc_network.style.color="#ffffff"
        btn_project_mlsys.style.color="#FFDC00"
        btn_project_embeded.style.color="#ffffff"
    } else if(id === "btn_project_embeded"){
        // switch div
        project_dc_network.style.display="none";
        project_mlsys.style.display="none";
        project_embeded.style.display="block";
        // set button style
        btn_project_dc_network.style.color="#ffffff"
        btn_project_mlsys.style.color="#ffffff"
        btn_project_embeded.style.color="#FFDC00"
    }
}