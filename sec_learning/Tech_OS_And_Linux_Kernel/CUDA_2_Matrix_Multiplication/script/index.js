async function load_page(){
    _load_catalogue().then( 
        (return_struct)=>{ 
            document.getElementById('load_catalogue_alert').style.display = 'none'

            let label_list = return_struct.label_list
            _load_reference(label_list)
        }
    )
    
    _load_table()

    _load_pic()

    _load_equation()

    _load_theorm()

    _load_code_segment()

    _load_note()

    _load_keyword()

    _load_citation()
}

// 处理文章中所有的表格
async function _load_table(){
    let table_index_list = new Array()
    let table_containers = document.getElementsByClassName("table")

    // 记录所有 table 的编号，并且在 table div 中标识 table 的序号
    for(let i = 0; i < table_containers.length; i++){
        // 设置 id 和 name
        table_containers[i].setAttribute("id",`table_${i+1}`)
        table_containers[i].setAttribute('name', `table_${table_containers[i].id}`)

        // 记录 label
        let table_label = table_containers[i].getAttribute('label')
        table_index_list[table_label] = i+1

        // 创建标号
        let table_index = document.createElement('table_index')
        if(!table_containers[i].title)
            table_index.innerHTML = `Table ${i+1}`
        else
            table_index.innerHTML = `Table ${i+1}: ${table_containers[i].title}`

        // 创建源
        if(table_containers[i].getAttribute('source')){
            let link = document.createElement('a')
            link.innerHTML = '[Source]'
            link.setAttribute('href', table_containers[i].getAttribute('source'))
            link.setAttribute('style', 'font-size:12px; font-family:italic; margin-left:5px; color:#FF4136')
            table_index.append(link)
        }

        // 显示标号
        table_containers[i].append(table_index)
    }

    // 替换所有的表格引用
    let table_refs = document.getElementsByTagName("tableref")
    for(let i = 0; i < table_refs.length; i++){
         // 获取 Equation 标识号
         let selected_table_index = table_index_list[table_refs[i].innerHTML]

        // 创建链接
        let table_link = document.createElement('a')
        table_link.setAttribute('href', `#table_${selected_table_index}`)

        // 修改 tableref 的内部内容
        table_link.innerHTML = `Table ${selected_table_index}`

        // 塞入原先位置
        table_refs[i].innerHTML = ''
        table_refs[i].append(table_link)
    }
}

// 处理文章中所有的图片
async function _load_pic(){
    let img_index_list = new Array()
    let img_containers = document.getElementsByClassName("img")

    // 记录所有 img 的编号，并且在 img div 中标识 img 的序号
    for(let i = 0; i < img_containers.length; i++){
        // 设置 id 和 name
        img_containers[i].setAttribute("id",`image_${i+1}`)
        img_containers[i].setAttribute('name', `image_${img_containers[i].id}`)

        // 记录 label
        let img_label = img_containers[i].getAttribute('label')
        img_index_list[img_label] = i+1

        // 创建标号
        let img_index = document.createElement('img_index')
        if(!img_containers[i].title)
            img_index.innerHTML = `Figure ${i+1}`
        else
            img_index.innerHTML = `Figure ${i+1}: ${img_containers[i].title}`
        
        // 创建源
        if(img_containers[i].getAttribute('source')){
            let link = document.createElement('a')
            link.innerHTML = '[Source]'
            link.setAttribute('href', img_containers[i].getAttribute('source'))
            link.setAttribute('style', 'font-size:12px; font-family:italic; margin-left:5px; color:#FF4136')
            img_index.append(link)
        }

        // 显示标号
        img_containers[i].append(img_index)
    }

    // 替换所有的图片引用
    let img_refs = document.getElementsByTagName("imgref")
    for(let i = 0; i < img_refs.length; i++){
         // 获取 Equation 标识号
         let selected_img_index = img_index_list[img_refs[i].innerHTML]

        // 创建链接
        let img_link = document.createElement('a')
        img_link.setAttribute('href', `#image_${selected_img_index}`)

        // 修改 imgref 的内部内容
        img_link.innerHTML = `Figure ${selected_img_index}`

        // 塞入原先位置
        img_refs[i].innerHTML = ''
        img_refs[i].append(img_link)
    }
}

// 处理文章中所有的等式
async function _load_equation(){
    let equation_index_list = new Array()
    let equation_containers = document.getElementsByClassName("equation")

    // 记录所有 equation 的编号，并且在 equation div 中标识 equation 的序号
    for(let i = 0; i < equation_containers.length; i++){
        // 设置 id
        equation_containers[i].setAttribute("id",`equation_${i+1}`)

        // 记录标签
        let equation_label = equation_containers[i].getAttribute("label")
        equation_index_list[equation_label] = i+1

        // 创建标号
        let equation_index = document.createElement('equation_index')
        equation_index.setAttribute('name', equation_containers[i].id)
        equation_index.innerHTML = `Equation ${i+1}`

        // 显示标号
        let fc = equation_containers[i].firstChild
        equation_containers[i].insertBefore(equation_index,fc)
    }

    // 替换所有的等式
    let equation_refs = document.getElementsByTagName("equation")
    for(let i = 0; i < equation_refs.length; i++){
        // 获取 equation id
        let selected_equation_index = equation_index_list[equation_refs[i].innerHTML]

        // 创建链接
        let equation_link = document.createElement('a')
        equation_link.setAttribute('href', `#equation_${selected_equation_index}`)

        // 修改 equation 的内部内容
        equation_link.innerHTML = `Equation ${selected_equation_index}`

        // 塞入原先位置
        equation_refs[i].innerHTML = ''
        equation_refs[i].append(equation_link)
    }
}

// 处理文章中所有的定理
async function _load_theorm(){
    let theorm_index_list = new Array()
    let theorm_containers = document.getElementsByClassName("theorm")

    // 记录所有 theorm 的编号，并且在 theorm div 中标识 theorm 的序号
    for(let i = 0; i < theorm_containers.length; i++){
        // 设置 id
        theorm_containers[i].setAttribute("id",`theorm_${i+1}`)

        // 记录编号
        let theorm_label = theorm_containers[i].getAttribute("label")
        theorm_index_list[theorm_label] = i+1

        // 创建标号
        let theorm_index = document.createElement('theorm_index')
        theorm_index.setAttribute('name', `theorm_${i+1}`)
        theorm_index.innerHTML = `Theorm ${i+1}`

        // 显示标号
        let fc = theorm_containers[i].firstChild
        theorm_containers[i].insertBefore(theorm_index,fc)
    }

    // 替换所有的定理
    let theorm_refs = document.getElementsByTagName("theorm")
    for(let i = 0; i < theorm_refs.length; i++){
        // 获取 theorm id
        let selected_theorm_index = theorm_index_list[theorm_refs[i].innerHTML]

        // 创建链接
        let theorm_link = document.createElement('a')
        theorm_link.setAttribute('href', `#theorm_${selected_theorm_index}`)

        // 修改 theorm 的内部内容
        theorm_link.innerHTML = `Theorm ${selected_theorm_index}`

        // 塞入原先位置
        theorm_refs[i].innerHTML = ''
        theorm_refs[i].append(theorm_link)
    }
}

// 点击 显示/隐藏代码段 按钮的回调函数
async function _show_code_segment(id){
    let code_segment_container = document.getElementById(`container_${id}`)
    let code_segment_button = document.getElementById(`${id}`)

    if(code_segment_container.style.display == 'none'){
        code_segment_container.style.display = ''
        code_segment_button.innerHTML = '隐藏代码段'
    } else {
        code_segment_container.style.display = 'none'
        code_segment_button.innerHTML = '显示代码段'
    }
}

// 处理文章中所有的代码段
async function _load_code_segment(){
    let code_segments = document.getElementsByTagName('figure')
    for(let i = 0; i < code_segments.length; i++){
        // 创建一个按钮
        let code_segment_btn = document.createElement('button')
        code_segment_btn.setAttribute('type', 'button')
        code_segment_btn.setAttribute('id', `code_segment_${i}`)
        code_segment_btn.setAttribute('onclick', '_show_code_segment(id)')
        code_segment_btn.innerHTML = '显示代码段'

        // 在代码段外面包上一个 container
        let code_segment_container = document.createElement('div')
        code_segments[i].parentNode.insertBefore(code_segment_container, code_segments[i].nextElementSibling)
        code_segment_container.appendChild(code_segments[i])

        // 设置 container 属性，以及暂时设置为不可见
        code_segment_container.setAttribute('id', `container_code_segment_${i}`)
        code_segment_container.style.display = 'none'

        // 创建一个最外层的 container
        let outside_container = document.createElement('div')
        outside_container.setAttribute('class', 'div_code_segment')
        
        // 将按钮塞入最外层 container
        outside_container.appendChild(code_segment_btn)

        // 将代码段 container 塞入最外层 container
        code_segment_container.parentNode.insertBefore(outside_container, code_segment_container.nextElementSibling)
        outside_container.appendChild(code_segment_container)
    }
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
        let mapping_links = new Array();

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

            if(ref_entries[i].link != ""){
                mapping_links[`${ref_entries[i].short}`] = `${ref_entries[i].link}`
            } else {
                mapping_links[`${ref_entries[i].short}`] = ""
            }

            list_element.append(new_list_entry)
        }

        // 替换所有引用文献的值
        let cites = document.getElementsByTagName('cite')
        for(let i = 0; i < cites.length; i++){
            let short_ref = cites[i].innerHTML
            let ref_index = mapping[`${short_ref}`]
            if(mapping_links[`${short_ref}`] == ""){
                cites[i].innerHTML = `[${ref_index}]`
            } else {
                let ref_link = document.createElement('a')
                ref_link.setAttribute('style', 'font-size:12px; font-family: italic; margin-right: 2px;')
                ref_link.setAttribute('href', `${mapping_links[`${short_ref}`]}`)
                ref_link.innerHTML = `[${ref_index}]`
                cites[i].innerHTML = ''
                cites[i].append(ref_link)
            }
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
                new_ordered_list.setAttribute('id', `ol_for_h2_${old_h2_index}_h3_${old_h3_index}_h4_list`)
                
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
                let ordered_list = document.getElementById(`ol_for_h2_${old_h2_index}_h3_${old_h3_index}_h4_list`);

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
                new_ordered_list.setAttribute('id', `ol_for_h2_${old_h2_index}_h3_${old_h3_index}_h4_${old_h4_index}_h5_list`)
                
                // 创建表项
                let new_ordered_list_entry = document.createElement("li");
                let new_ordered_list_entry_link = document.createElement("a");
                new_ordered_list_entry_link.setAttribute('class', 'a_catalogue_title')
                new_ordered_list_entry_link.innerHTML = `${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`
                new_ordered_list_entry_link.setAttribute('href', `#${old_h2_index}.${old_h3_index}.${old_h4_index}.${h5_index} ${h5_title}`)
                new_ordered_list_entry.append(new_ordered_list_entry_link)
                new_ordered_list.append(new_ordered_list_entry)

                // 向上一级目录中放入新创建的列表
                let upper_ordered_list = document.getElementById(`ol_for_h2_${old_h2_index}_h3_${old_h3_index}_h4_list`);
                let upper_ordered_list_last_entry = upper_ordered_list.lastChild
                upper_ordered_list_last_entry.append(new_ordered_list)

                last_catalogue_entry_content = new_ordered_list_entry
                h5_index += 1
            } else {
                // 获取目标列表
                let ordered_list = document.getElementById(`ol_for_h2_${old_h2_index}_h3_${old_h3_index}_h4_${old_h4_index}_h5_list`);

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

// utils: 在元素后面插入元素
function insertAfter(newElement, targentElement) {
    let parent = targentElement.parentNode;
    if (parent.lastChild == targentElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targentElement.nextSibling)
    }
}