async function load_page(){
    _load_catalogue().then( 
        (return_struct)=>{ 
            document.getElementById('load_catalogue_alert').style.display = 'none'

            let label_list = return_struct.label_list
            _load_reference(label_list)
        }
    )
    
    _load_note()

    _load_keyword()

    _load_citation()
}

// 替换文章中所有的对其他章节的引用
async function _load_reference(label_list){
    let refs = document.getElementsByTagName('ref');
    
    for(let i = 0; i < refs.length; i++){
        let link = label_list[`${refs[i].innerHTML}`]

        // 克隆元素
        let link_copy = link.cloneNode(true)
        
        refs[i].innerHTML = null
        refs[i].append(link_copy)
    }
}

// 替换文章中所有注意事项的样式
async function _load_note(){
    let notes = document.getElementsByTagName('note');

    for(let i = 0; i < notes.length; i++){
        let new_font = document.createElement('font')
        new_font.setAttribute('color', 'red')
        new_font.innerHTML = notes[i].innerHTML
        notes[i].innerHTML = null
        notes[i].append(new_font)
    }
}

// 收集文章中出现的所有关键词，记录在一个表格中，方便后续拓展
async function _load_keyword(){
    let keywords = document.getElementsByTagName('def');

    let keyword_list = new Array()

    for(let i = 0; i < keywords.length; i++){
        keyword_list[keyword_list.length] = keywords[i].innerHTML

        let new_font = document.createElement('font')
        new_font.setAttribute('color', 'blue')
        new_font.innerHTML = keywords[i].innerHTML
        keywords[i].innerHTML = null
        keywords[i].append(new_font)
    }
}

// 根据根目录下的 ./ref.json 文件，加载文章中所有引用的文献，并且将对应位置的引用记录替换为序号
async function _load_citation(){
    fetch('./ref.json')
    .then((res) => {return res.json();})
    .then((ref_entries) => {

        let ref_container = document.getElementById('ref_container')
        let list_element = null
        let mapping = new Array();

        if(ref_entries.length > 0){
            // 创建标题
            let title = document.createElement('h2')
            title.innerHTML = "Reference"
            ref_container.append(title)

            // 创建列表
            list_element = document.createElement('ol')
            ref_container.append(list_element)
        }

        // 整理所有引用文献
        for(let i = 0; i < ref_entries.length; i++){
            let new_list_entry = document.createElement('li')
            
            if(ref_entries[i].author != ""){
                new_list_entry.append(`${ref_entries[i].author},  `)
            }
            
            if(ref_entries[i].title != ""){
                if(ref_entries[i].link != ""){
                    let title_with_link = document.createElement('a')
                    title_with_link.setAttribute("href", `${ref_entries[i].link}`)
                    title_with_link.innerHTML = `${ref_entries[i].title}`
                    new_list_entry.append(title_with_link)
                    new_list_entry.append(",  ")
                } else {
                    new_list_entry.append(`${ref_entries[i].title},  `)
                }
            }
            
            if(ref_entries[i].time != ""){
                new_list_entry.append(`${ref_entries[i].time}`)
            }

            mapping[`${ref_entries[i].short}`] = `${i+1}`
            list_element.append(new_list_entry)
        }

        // 替换所有引用文献的值
        let cites = document.getElementsByTagName('cite')
        for(let i = 0; i < cites.length; i++){
            let short_ref = cites[i].innerHTML
            let ref_index = mapping[`${short_ref}`]
            cites[i].innerHTML = `[${ref_index}]`
        }
    })
}

// 构建文章的目录
async function _load_catalogue(){
    let titles = document.getElementsByClassName('title')
    let catalogue_container = document.getElementById('catalogue_container')
    
    let h2_index = 1
    let h3_index = 1
    let h4_index = 1
    let h5_index = 1

    let old_h2_index = 1
    let old_h3_index = 1
    let old_h4_index = 1

    let last_catalogue_entry_content = null

    var label_list = new Array()

    for(let i = 0; i < titles.length; i++){
        if(titles[i].tagName == 'H2'){
            // 获取标题，并且添加连接 name
            let h2_title = titles[i].innerHTML
            let title_link = document.createElement("a");
            title_link.setAttribute('name', `${h2_index}. ${h2_title}`)
            title_link.innerHTML = `${h2_index}. ${h2_title}`
            titles[i].innerHTML = null
            titles[i].append(title_link)

            // 插入目录表项
            let new_catalogue_entry = document.createElement("p");
            let new_catalogue_entry_link = document.createElement("a");
            new_catalogue_entry_link.setAttribute('class', 'a_catalogue_title')
            new_catalogue_entry_link.innerHTML = `${h2_index}. ${h2_title}`
            new_catalogue_entry_link.setAttribute('href', `#${h2_index}. ${h2_title}`)
            new_catalogue_entry.append(new_catalogue_entry_link)
            catalogue_container.append(new_catalogue_entry)

            // 清空子目录表项
            if(h3_index != 1 || h4_index != 1 || h5_index != 1){
                h3_index = 1
                h4_index = 1
                h5_index = 1
            }

            last_catalogue_entry_content = new_catalogue_entry
            old_h2_index = h2_index
            h2_index += 1
        } else if(titles[i].tagName == 'H3'){
            // 获取标题
            let h3_title = titles[i].innerHTML
            let title_link = document.createElement("a");
            title_link.setAttribute('name', `${old_h2_index}.${h3_index} ${h3_title}`)
            title_link.innerHTML = `${old_h2_index}.${h3_index} ${h3_title}`
            titles[i].innerHTML = null
            titles[i].append(title_link)

            // 判断是否创建过列表
            if(h3_index == 1){
                // 创建列表
                let new_ordered_list = document.createElement("ul");
                new_ordered_list.setAttribute('id', `ol_for_h2_${old_h2_index}_h3_list`)
                
                // 创建表项
                let new_ordered_list_entry = document.createElement("li");
                let new_ordered_list_entry_link = document.createElement("a");
                new_ordered_list_entry_link.setAttribute('class', 'a_catalogue_title')
                new_ordered_list_entry_link.innerHTML = `${old_h2_index}.${h3_index} ${h3_title}`
                new_ordered_list_entry_link.setAttribute('href', `#${old_h2_index}.${h3_index} ${h3_title}`)
                new_ordered_list_entry.append(new_ordered_list_entry_link)
                new_ordered_list.append(new_ordered_list_entry)

                // 向目录中放入新创建的列表
                catalogue_container.append(new_ordered_list)

                last_catalogue_entry_content = new_ordered_list_entry
                old_h3_index = h3_index
                h3_index += 1
            } else {
                // 获取目标列表
                let ordered_list = document.getElementById(`ol_for_h2_${old_h2_index}_h3_list`);

                // 创建表项
                let new_ordered_list_entry = document.createElement("li");
                let new_ordered_list_entry_link = document.createElement("a");
                new_ordered_list_entry_link.setAttribute('class', 'a_catalogue_title')
                new_ordered_list_entry_link.innerHTML = `${old_h2_index}.${h3_index} ${h3_title}`
                new_ordered_list_entry_link.setAttribute('href', `#${old_h2_index}.${h3_index} ${h3_title}`)
                new_ordered_list_entry.append(new_ordered_list_entry_link)
                ordered_list.append(new_ordered_list_entry)

                last_catalogue_entry_content = new_ordered_list_entry
                old_h3_index = h3_index
                h3_index += 1
            }

            // 清空子目录表项
            if(h4_index != 1 || h5_index != 1){
                h4_index = 1
                h5_index = 1
            }

        } else if(titles[i].tagName == 'H4'){
            // 获取标题
            let h4_title = titles[i].innerHTML
            let title_link = document.createElement("a");
            title_link.setAttribute('name', `${old_h2_index}.${old_h3_index}.${h4_index} ${h4_title}`)
            title_link.innerHTML = `${old_h2_index}.${old_h3_index}.${h4_index} ${h4_title}`
            titles[i].innerHTML = null
            titles[i].append(title_link)

            // 判断是否创建过列表
            if(h4_index == 1){
                // 创建列表
                let new_ordered_list = document.createElement("ul");
                new_ordered_list.setAttribute('id', `ol_for_h3_${old_h3_index}_h4_list`)
                
                // 创建表项
                let new_ordered_list_entry = document.createElement("li");
                let new_ordered_list_entry_link = document.createElement("a");
                new_ordered_list_entry_link.setAttribute('class', 'a_catalogue_title')
                new_ordered_list_entry_link.innerHTML = `${old_h2_index}.${old_h3_index}.${h4_index} ${h4_title}`
                new_ordered_list_entry_link.setAttribute('href', `#${old_h2_index}.${old_h3_index}.${h4_index} ${h4_title}`)
                new_ordered_list_entry.append(new_ordered_list_entry_link)
                new_ordered_list.append(new_ordered_list_entry)

                // 向上一级目录中放入新创建的列表
                let upper_ordered_list = document.getElementById(`ol_for_h2_${old_h2_index}_h3_list`);
                let upper_ordered_list_last_entry = upper_ordered_list.lastChild
                upper_ordered_list_last_entry.append(new_ordered_list)

                last_catalogue_entry_content = new_ordered_list_entry
                old_h4_index = h4_index
                h4_index += 1
            } else {
                // 获取目标列表
                let ordered_list = document.getElementById(`ol_for_h3_${old_h3_index}_h4_list`);

                // 创建表项
                let new_ordered_list_entry = document.createElement("li");
                let new_ordered_list_entry_link = document.createElement("a");
                new_ordered_list_entry_link.setAttribute('class', 'a_catalogue_title')
                new_ordered_list_entry_link.innerHTML = `${old_h2_index}.${old_h3_index}.${h4_index} ${h4_title}`
                new_ordered_list_entry_link.setAttribute('href', `#${old_h2_index}.${old_h3_index}.${h4_index} ${h4_title}`)
                new_ordered_list_entry.append(new_ordered_list_entry_link)
                ordered_list.append(new_ordered_list_entry)

                last_catalogue_entry_content = new_ordered_list_entry
                old_h4_index = h4_index
                h4_index += 1
            }

            // 清空子目录表项
            if(h5_index != 1){
                h5_index = 1
            }
            
        } else if(titles[i].tagName == 'H5'){
            // 获取标题
            let h5_title = titles[i].innerHTML
            let title_link = document.createElement("a");
            title_link.setAttribute('name', `${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`)
            title_link.innerHTML = `${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`
            titles[i].innerHTML = null
            titles[i].append(title_link)

            // 判断是否创建过列表
            if(h5_index == 1){
                // 创建列表
                let new_ordered_list = document.createElement("ul");
                new_ordered_list.setAttribute('id', `ol_for_h4_${old_h4_index}_h5_list`)
                
                // 创建表项
                let new_ordered_list_entry = document.createElement("li");
                let new_ordered_list_entry_link = document.createElement("a");
                new_ordered_list_entry_link.setAttribute('class', 'a_catalogue_title')
                new_ordered_list_entry_link.innerHTML = `${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`
                new_ordered_list_entry_link.setAttribute('href', `#${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`)
                new_ordered_list_entry.append(new_ordered_list_entry_link)
                new_ordered_list.append(new_ordered_list_entry)

                // 向上一级目录中放入新创建的列表
                let upper_ordered_list = document.getElementById(`ol_for_h3_${old_h3_index}_h4_list`);
                let upper_ordered_list_last_entry = upper_ordered_list.lastChild
                upper_ordered_list_last_entry.append(new_ordered_list)

                last_catalogue_entry_content = new_ordered_list_entry
                h5_index += 1
            } else {
                // 获取目标列表
                let ordered_list = document.getElementById(`ol_for_h4_${old_h4_index}_h5_list`);

                // 创建表项
                let new_ordered_list_entry = document.createElement("li");
                let new_ordered_list_entry_link = document.createElement("a");
                new_ordered_list_entry_link.setAttribute('class', 'a_catalogue_title')
                new_ordered_list_entry_link.innerHTML = `${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`
                new_ordered_list_entry_link.setAttribute('href', `#${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`)
                new_ordered_list_entry.append(new_ordered_list_entry_link)
                ordered_list.append(new_ordered_list_entry)

                last_catalogue_entry_content = new_ordered_list_entry
                h5_index += 1
            }
        } else if(titles[i].tagName == 'DESP'){
            // 拿到相关数据
            let desp = titles[i].innerHTML

            // 删除该标签
            titles[i].innerHTML = ""

            // 进行补充
            last_catalogue_entry_content.append(` : ${desp}`)

        } else if(titles[i].tagName == 'LABEL'){
            var direct_link_container = last_catalogue_entry_content.children[0]
            let label = titles[i].innerHTML
            label_list[`${label}`] = direct_link_container
            titles[i].innerHTML = null
        }
    }

    return {
        "label_list": label_list
    }
}