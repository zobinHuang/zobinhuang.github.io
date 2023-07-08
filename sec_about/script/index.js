async function load_page(){
    _load_projects();
    _load_papers();
    _load_industries();
}

const _bold_query = (str, query) => {
    const n = str.toUpperCase();
    const q = query.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) {
        return str; // bail early
    }
    const l = q.length;
    return str.substr(0, x) + '<b><u>' + str.substr(x, l) + '</u></b>' + str.substr(x + l);
}

function _get_child_nodes(node) {
    var children = new Array();
    for(var child in node.childNodes) {
        if(node.childNodes[child].nodeType == 1) {
            children.push(child);
        }
    }
    return children;
}

async function _load_industries(){
    fetch('./script/industries.json')
    .then((res) => {return res.json();})
    .then((industry_entries) => {
        let industry_block = document.getElementById("industry_block")
        let industry_block_title = document.getElementById("industry_block_title")

        // create button group in paper_block_title
        let btn_group = document.createElement("div")
        btn_group.setAttribute("class", "btn_group")
        industry_block_title.append(btn_group)

        // create "all" button
        let btn = document.createElement("button")
        btn.setAttribute("id", `btn_industry_all`)
        btn.setAttribute("onclick", "selectIndustryClass(id);")
        btn.innerHTML = `All`
        btn.setAttribute("style", "color:#FFDC00;")
        btn_group.append(btn)

        // create "all" class block
        let all_industry_class_block = document.createElement("div")
        all_industry_class_block.setAttribute("id", `industry_all`)
        all_industry_class_block.setAttribute("class", "industry_class_container")
        // all_paper_class_block.setAttribute("style", "display:none;")
        industry_block.append(all_industry_class_block)

        for(let i=0; i<industry_entries.length; i++){
            let industry_class = industry_entries[i]

            let industry_class_block = document.createElement("div")
            industry_class_block.setAttribute("id", `industry_${industry_class.short}`)
            industry_class_block.setAttribute("class", "industry_class_container")
            industry_class_block.setAttribute("style", "display:none;")
            industry_block.append(industry_class_block)

            // create button in button group
            let btn = document.createElement("button")
            btn.setAttribute("id", `btn_industry_${industry_class.short}`)
            btn.setAttribute("onclick", "selectIndustryClass(id);")
            btn.innerHTML = `${industry_class.name}`
            // if(i == 0){ btn.setAttribute("style", "color:#FFDC00;") }
            btn_group.append(btn)

            // insert exps
            let nb_exps = 0;
            for(let j=0; j<industry_class.list.length; j++){
                let exp = industry_class.list[j]

                if(exp?.hidden){
                    continue;
                }
                nb_exps += 1;

                let exp_container = document.createElement("div")
                exp_container.setAttribute("class", "industry_container")
                
                // insert logo
                let exp_logo_container = document.createElement("div")
                exp_logo_container.setAttribute("class", "industry_logo_container")
                exp_container.append(exp_logo_container)
                let exp_logo = document.createElement("img")
                exp_logo.setAttribute("src", `${exp.logo_url}`)
                exp_logo_container.append(exp_logo)

                // insert intro
                let industry_intro_container = document.createElement("div")
                industry_intro_container.setAttribute("class", "industry_intro_container")
                exp_container.append(industry_intro_container)

                // insert intro title
                let industry_intro_title_container = document.createElement("div")
                industry_intro_title_container.setAttribute("class", "industry_intro_title_container")
                industry_intro_container.append(industry_intro_title_container)

                // title details
                let title_h2 = document.createElement("h2")
                industry_intro_title_container.append(title_h2)
                title_h2.innerHTML = `${exp.company}`
                if(exp.duration !== ""){
                    let duration_container = document.createElement("duration")
                    if(exp.base !== ""){
                        duration_container.innerHTML = `${exp.duration} (@ ${exp.base})`
                    } else {
                        duration_container.innerHTML = `${exp.duration}`
                    }
                    
                    title_h2.append(duration_container)
                }
                if(exp.job !== ""){
                    let job_container = document.createElement("job")
                    job_container.innerHTML = `${exp.job}`
                    title_h2.append(job_container)
                }
                if(exp.department !== ""){
                    let department_container = document.createElement("department")
                    department_container.innerHTML = `${exp.department}`
                    title_h2.append(department_container)
                }

                // insert content
                let content_ul = document.createElement("ul")
                industry_intro_container.append(content_ul)
                for(let k=0; k<exp.content.length; k++){
                    let content = exp.content[k]

                    let content_li = document.createElement("li")
                    content_ul.append(content_li)

                    if(content?.subtitle_en !== "" || content?.content_en !== ""){
                        let en_part = document.createElement("p")
                        en_part.setAttribute("style", "padding: 0px; margin: 0px;")
                        content_li.append(en_part)

                        if(content?.subtitle_en !== ""){
                            let en_subtitle = document.createElement("span")
                            en_subtitle.setAttribute("style", "font-weight: bolder; font-size: 15px;")
                            en_subtitle.innerHTML = `<u>${content.subtitle_en}</u>: `
                            en_part.append(en_subtitle)
                        }

                        if(content?.change_line){
                            let en_br = document.createElement("br")
                            en_part.append(en_br)
                        }

                        if(content?.content_en !== ""){
                            let en_content = document.createElement("span")
                            en_content.innerHTML = `${content.content_en};`
                            en_part.append(en_content)
                        }
                    }
                    
                    if(content?.subtitle_cn !== "" || content?.content_cn !== ""){
                        let cn_part = document.createElement("p")
                        cn_part.setAttribute("style", "padding: 0px; margin: 0px;")
                        content_li.append(cn_part)

                        if(content?.subtitle_cn !== ""){
                            let cn_subtitle = document.createElement("span")
                            cn_subtitle.setAttribute("style", "padding: 0px; margin: 0px; font-weight: bolder; font-size: 12px; color: #ba0000;")
                            cn_subtitle.innerHTML = `<u>${content.subtitle_cn}</u>: `
                            cn_part.append(cn_subtitle)
                        }

                        if(content?.change_line){
                            let cn_br = document.createElement("br")
                            cn_part.append(cn_br)
                        }

                        if(content?.content_cn !== ""){
                            let cn_content = document.createElement("span")
                            cn_content.setAttribute("style", "padding: 0px; margin: 0px; font-size: 12px; color: #ba0000;")
                            cn_content.innerHTML = `${content.content_cn};`
                            cn_part.append(cn_content)
                        }
                    }
                }

                industry_class_block.append(exp_container)
                all_industry_class_block.append(exp_container.cloneNode(true))
            }

            // 提示没有
            if(nb_exps === 0){
                let nothing_alert = document.createElement("div")
                nothing_alert.setAttribute("class", "nothing_alert_container")
                industry_class_block.append(nothing_alert)

                let na_img = document.createElement("img")
                na_img.setAttribute("src", "./pic/thinking-face.svg")
                na_img.setAttribute("width", "50px")
                nothing_alert.append(na_img)

                let na_word = document.createElement("h5")
                na_word.innerHTML = "N/A, still working on it<br>暂无，正在努力"
                nothing_alert.append(na_word)
            }
        }
    })
}

async function _load_papers(){
    fetch('./script/papers.json')
    .then((res) => {return res.json();})
    .then((paper_entries) => {
        let paper_block = document.getElementById("paper_block")
        let paper_block_title = document.getElementById("paper_block_title")

        // create button group in paper_block_title
        let btn_group = document.createElement("div")
        btn_group.setAttribute("class", "btn_group")
        paper_block_title.append(btn_group)

        // create "all" button
        let btn = document.createElement("button")
        btn.setAttribute("id", `btn_paper_all`)
        btn.setAttribute("onclick", "selectPaperClass(id);")
        btn.innerHTML = `Full Paper List`
        btn.setAttribute("style", "color:#FFDC00;")
        btn_group.append(btn)

        // create "all" class block
        let all_paper_class_block = document.createElement("div")
        all_paper_class_block.setAttribute("id", `paper_all`)
        all_paper_class_block.setAttribute("class", "paper_class_container")
        // all_paper_class_block.setAttribute("style", "display:none;")
        paper_block.append(all_paper_class_block)

        // create "all" paper list
        let all_paper_list_container = document.createElement("ul")
        all_paper_class_block.append(all_paper_list_container)

        for(let i=0; i<paper_entries.length; i++){
            let paper_class = paper_entries[i]

            // create button in button group
            let btn = document.createElement("button")
            btn.setAttribute("id", `btn_paper_${paper_class.short}`)
            btn.setAttribute("onclick", "selectPaperClass(id);")
            btn.innerHTML = `${paper_class.name}`
            // if(i == 0){ btn.setAttribute("style", "color:#FFDC00;") }
            btn_group.append(btn)

            // create project class block
            let paper_class_block = document.createElement("div")
            paper_class_block.setAttribute("id", `paper_${paper_class.short}`)
            paper_class_block.setAttribute("class", "paper_class_container")
            paper_class_block.setAttribute("style", "display:none;")
            paper_block.append(paper_class_block)

            let paper_list_container = document.createElement("ul")
            paper_class_block.append(paper_list_container)

            // insert papers
            for(let j=0; j<paper_class.list.length; j++){
                // obtain project from the list
                let paper = paper_class.list[j]

                let paper_entry = document.createElement("li")
                
                // title & links
                let paper_entry_1_row = document.createElement("p")
                paper_entry.append(paper_entry_1_row)
                
                let paper_title = document.createElement("span")
                paper_title.setAttribute("class", "paper_title_span")
                paper_title.innerHTML = `${paper.title} `
                paper_entry_1_row.append(paper_title)

                if(paper.paper_link !== ""){
                    let paper_link = document.createElement("a")
                    paper_link.setAttribute("href", `${paper.paper_link}`)
                    paper_link.setAttribute("target", "_blank")
                    paper_link.setAttribute("class", "paper_link")
                    paper_link.innerHTML = "[Paper]"
                    paper_entry_1_row.append(paper_link)
                }

                if(paper.preprint_link !== ""){
                    let preprint_link = document.createElement("a")
                    preprint_link.setAttribute("href", `${paper.preprint_link}`)
                    preprint_link.setAttribute("class", "paper_link")
                    preprint_link.setAttribute("target", "_blank")
                    preprint_link.innerHTML = "[Preprint]"
                    paper_entry_1_row.append(preprint_link)
                }

                if(paper.slide_link !== ""){
                    let slide_link = document.createElement("a")
                    slide_link.setAttribute("href", `${paper.slide_link}`)
                    slide_link.setAttribute("class", "paper_link")
                    slide_link.setAttribute("target", "_blank")
                    slide_link.innerHTML = "[Slide]"
                    paper_entry_1_row.append(slide_link)
                }

                if(paper.talk_link !== ""){
                    let talk_link = document.createElement("a")
                    talk_link.setAttribute("href", `${paper.talk_link}`)
                    talk_link.setAttribute("class", "paper_link")
                    talk_link.setAttribute("target", "_blank")
                    talk_link.innerHTML = "[Talk]"
                    paper_entry_1_row.append(talk_link)
                }

                // authors
                let paper_entry_2_row = document.createElement("p")
                paper_entry.append(paper_entry_2_row)

                let paper_authors = document.createElement("span")
                paper_authors.setAttribute("class", "paper_occur_authors")
                let authors_string = `${paper.authors}`
                authors_string = _bold_query(authors_string, "Zhuobin Huang")
                paper_authors.innerHTML = `${authors_string}`
                paper_entry_2_row.append(paper_authors)

                // occur
                let paper_entry_3_row = document.createElement("p")
                paper_entry.append(paper_entry_3_row)

                let paper_occur = document.createElement("span")
                paper_occur.setAttribute("class", "paper_occur_span")
                paper_occur.innerHTML = `[${paper.occur}] `
                paper_entry_3_row.append(paper_occur)
                

                paper_list_container.append(paper_entry)
                all_paper_list_container.append(paper_entry.cloneNode(true))
            }
        }
    })
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
            btn.setAttribute("id", `btn_project_${project_class.short}`)
            btn.setAttribute("onclick", "selectProjectClass(id);")
            btn.innerHTML = `${project_class.name}`
            if(i == 0){ btn.setAttribute("style", "color:#FFDC00;") }
            btn_group.append(btn)

            // create project class block
            let project_class_block = document.createElement("div")
            project_class_block.setAttribute("id", `project_${project_class.short}`)
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

function selectIndustryClass(id){
    let industry_block = document.getElementById("industry_block")
    let child_index = _get_child_nodes(industry_block)

    let selected_industry_class_short = id.substring("btn_industry_".length)
    let selected_industry_class_str = `industry_${selected_industry_class_short}`
    
    // 跳过了 i=0，因为那是 industry_block_title
    for(let i=1; i<child_index.length; i++){
        let industry_class = industry_block.childNodes[child_index[i]]
        let industry_class_btn = document.getElementById(`btn_${industry_class.id}`)

        if(industry_class.id === selected_industry_class_str){
            industry_class.style.display="block";
            industry_class_btn.style.color="#FFDC00"
        } else {
            industry_class.style.display="none";
            industry_class_btn.style.color="#ffffff"
        }
    }
}

function selectPaperClass(id){
    let paper_block = document.getElementById("paper_block")
    let child_index = _get_child_nodes(paper_block)

    let selected_paper_class_short = id.substring("btn_paper_".length)
    let selected_paper_class_str = `paper_${selected_paper_class_short}`
    
    // 跳过了 i=0，因为那是 paper_block_title
    for(let i=1; i<child_index.length; i++){
        let paper_class = paper_block.childNodes[child_index[i]]
        let paper_class_btn = document.getElementById(`btn_${paper_class.id}`)

        if(paper_class.id === selected_paper_class_str){
            paper_class.style.display="block";
            paper_class_btn.style.color="#FFDC00"
        } else {
            paper_class.style.display="none";
            paper_class_btn.style.color="#ffffff"
        }
    }
}

function selectProjectClass(id){
    let project_block = document.getElementById("project_block")
    let child_index = _get_child_nodes(project_block)

    let selected_project_class_short = id.substring("btn_project_".length)
    let selected_project_class_str = `project_${selected_project_class_short}`
    
    // 跳过了 i=0，因为那是 project_block_title
    for(let i=1; i<child_index.length; i++){
        let project_class = project_block.childNodes[child_index[i]]
        let project_class_btn = document.getElementById(`btn_${project_class.id}`)

        if(project_class.id === selected_project_class_str){
            project_class.style.display="block";
            project_class_btn.style.color="#FFDC00"
        } else {
            project_class.style.display="none";
            project_class_btn.style.color="#ffffff"
        }
    }
}