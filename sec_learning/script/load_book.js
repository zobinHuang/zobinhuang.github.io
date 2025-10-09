async function load_book(){
    _load_catalogue()
}


function __load_module(div_class_container, modules_array, bookmark){
    for(let j = 0; j < modules_array.length; j++){
        let module = modules_array[j]

        // 跳过模版模块
        if(module.post_module_name == ""){
            continue
        }

        if(bookmark !== null && `#${module.post_module_label}` !== bookmark){
            continue
        }

        // 创建表格
        let module_table_container = document.createElement('div')
        module_table_container.setAttribute('class', 'div_learning')
        let module_table = document.createElement('table')
        module_table.setAttribute('border', '0')
        module_table.setAttribute('align', 'center')
        module_table_container.append(module_table)
        
        // 塞入外部 container 中
        div_class_container.append(module_table_container)
        if(j != modules_array.length-1){
            let br = document.createElement('br')
            div_class_container.append(br)
        }

        // 创建表格标题
        let table_entry_tr = document.createElement('tr')
        let table_entry_td = document.createElement('td')
        table_entry_tr.append(table_entry_td)
        let table_title_align_container = document.createElement('div')
        table_title_align_container.setAttribute('align', 'center')
        let table_title = document.createElement('h1')
        table_title.innerHTML = module.post_module_name
        
        if(module.hasOwnProperty("post_module_label")){
            let table_label_link = document.createElement('a')
            table_label_link.setAttribute('name', `${module.post_module_label}`)
            
            table_label_link.append(table_title)
            table_title_align_container.append(table_label_link)
            table_entry_td.append(table_title_align_container)
            module_table.append(table_entry_tr)
        } else {
            table_title_align_container.append(table_title)
            table_entry_td.append(table_title_align_container)
            module_table.append(table_entry_tr)
        }

        // 塞入文章目录
        for(let k = 0; k < module.posts.length; k++){
            // 创建外层 Container
            let table_entry_tr = document.createElement('tr')
            let table_entry_td = document.createElement('td')
            table_entry_tr.append(table_entry_td)

            // 创建链接
            let link = document.createElement('a')
            if(module.posts[k].external_link == ""){
                if(module.posts[k].post_name_url != "")
                    link.setAttribute('href', `./${module.post_module_url_prefix}_${module.posts[k].post_name_url}`)
                else
                    link.setAttribute('href', "")
            } else {
                link.setAttribute('href', module.posts[k].external_link)
            }
            
            // 将标题塞入 link
            let link_title = document.createElement('b')
            link_title.innerHTML = module.posts[k].post_title
            link.append(link_title)
            table_entry_td.append(link)

            // 在 td 最前面加上 [原创/转载] 的标签
            if(module.posts[k].hasOwnProperty("origin")){
                if(module.posts[k].origin){
                    let origin_tag = document.createElement('origin_tag')
                    // origin_tag.innerHTML = `原创`
                    origin_tag.innerHTML = `Original`
                    table_entry_td.append(origin_tag)
                } else {
                    let forward_tag = document.createElement('forward_tag')
                    // forward_tag.innerHTML = `转载`
                    forward_tag.innerHTML = `Reproduced`
                    table_entry_td.append(forward_tag)
                }
            } else {
                // 兼容老版本 (文章没有 origin 属性)
                if(module.posts[k].external_link === ""){
                    let origin_tag = document.createElement('origin_tag')
                    // origin_tag.innerHTML = `原创`
                    origin_tag.innerHTML = `Original`
                    table_entry_td.append(origin_tag)
                } else {
                    let forward_tag = document.createElement('forward_tag')
                    // forward_tag.innerHTML = `转载`
                    forward_tag.innerHTML = `Reproduced`
                    table_entry_td.append(forward_tag)
                }
            }

            // 在 td 最前面加上 [中文/英文] 的标签
            if(module.posts[k].hasOwnProperty("language")){
                if(module.posts[k].language === "cn"){
                    let cn_tag = document.createElement('cn_tag')
                    // cn_tag.innerHTML = `中文`
                    cn_tag.innerHTML = `🇨🇳 Chinese`
                    table_entry_td.append(cn_tag)
                } else if (module.posts[k].language === "en") {
                    let en_tag = document.createElement('en_tag')
                    en_tag.innerHTML = `🇺🇸 English`
                    table_entry_td.append(en_tag)
                }
            } else {
                // 兼容老版本 (文章没有 language 属性)
                let cn_tag = document.createElement('cn_tag')
                // cn_tag.innerHTML = `中文`
                cn_tag.innerHTML = `🇨🇳 Chinese`
                table_entry_td.append(cn_tag)
            }

            // 在 td 最前面加上 [日期] 的标签
            if(module.posts[k].hasOwnProperty("date")){
                let date_tag = document.createElement('date_tag')
                // cn_tag.innerHTML = `中文`
                date_tag.innerHTML = `${module.posts[k].date}`
                table_entry_td.append(date_tag)
            }
            
            // 将 td 塞入 tr
            module_table.append(table_entry_tr)

            if(module.posts[k].post_brief != ""){
                // 创建分隔符
                let br = document.createElement('br')
                table_entry_td.append(br)

                // 创建简介
                let brief = document.createElement('p')
                brief.innerHTML = `${module.posts[k].post_brief}`
                
                table_entry_td.append(`${module.posts[k].post_brief}`)
            }
        }
    }
}


function __load_class(div_class_container, post_class){
    // 先塞入标题
    let title = document.createElement('h1')
    title.innerHTML = post_class.post_class_tag
    div_class_container.append(title)
    modules_array = post_class.modules
    __load_module(div_class_container, modules_array, null)
}


// 加载文章目录
async function _load_catalogue(){
    let div_system_knowledge_container = document.getElementById("system-knowledge")
    let div_paper_reading_container = document.getElementById("paper-reading")
    let div_non_archived_knowledge_container = document.getElementById("non-archived-knowledge")

    let bookmark = window.location.hash
    let is_bookmark_exist = (bookmark.length !== 0) ? true : false

    fetch('./post_index.json')
    .then((res) => {return res.json();})
    .then((post_classes) => {
        for(let i = 0; i < post_classes.length; i++){
            // 如果这个模块是模版模块，跳过处理
            if(post_classes[i].modules.length == 0){
                continue;
            }

            // 存在书签，直接搜索相关 module 是否存在
            if(is_bookmark_exist){
                let modules_array = post_classes[i].modules
                __load_module(div_system_knowledge_container, modules_array, bookmark)
                continue
            }

            if(post_classes[i].post_class == "system-knowledge"){
                __load_class(div_system_knowledge_container, post_classes[i])
            } else if(post_classes[i].post_class == "paper-reading"){
                __load_class(div_paper_reading_container, post_classes[i])
            } else if(post_classes[i].post_class == "non-archived-knowledge"){
                __load_class(div_non_archived_knowledge_container, post_classes[i])
            }
        }
    })
}
