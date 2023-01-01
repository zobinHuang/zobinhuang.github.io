let language = ''

async function load_page(){
    
    _load_metadata()
    
    _load_paragraph()

    _load_flow_chart()

    _load_sign_block()

    _load_table()

    _load_pic()

    _load_equation()

    _load_theorm()

    _load_code_segment()

    _load_note()

    _load_keyword()

    _load_citation()
}

// 显示/隐藏目录按钮回调
async function _show_catalogue(){
    let div_catalogue = document.getElementById('div_catalogue')
    let button = document.getElementById('show_catalogue_btn')
    if(div_catalogue.className === 'div_catalogue'){
        div_catalogue.setAttribute('class', 'div_catalogue_disappear')
        if(language === 'cn')
            button.innerHTML = '显示目录'
        else
            button.innerHTML = 'Show Catalogue'
        setTimeout(function() { div_catalogue.style.display = 'none'; }, 300);
    } else {
        div_catalogue.style.display = ''
        if(language === 'cn')
            button.innerHTML = '隐藏目录'
        else
            button.innerHTML = 'Hide Catalogue'
        div_catalogue.setAttribute('class', 'div_catalogue')
    }
}

// 加载本文的元数据，包括目录
/* 该函数构造出来的 DOM 形如:
    <div id="metadata" class="base_block indicate_source_block">
    <div class="base_block_container indicate_source_block_container">
        <!-- Title -->
        <div class="base_block_title_container indicate_source_block_title_container">
            <button id='show_catalogue_btn'>显示目录</button>
            <img src="./pic/source_sign.png" width="30px" />
            <p>About This Post
        </div>
        <!-- Bar -->
        <div class="base_block_bar indicate_source_block_bar"></div>
        <!-- Content -->
        <div class="base_block_content_container indicate_source_block_content_container">
            <ul>
                <li><entry_title>作者</entry_title>: Zhuobin Huang</li>
                <li><entry_title>日期</entry_title>: Sept.19 2022</li>
                <li><entry_title>版权声明</entry_title>: 著作权归作者所有，商业转载请联系作者获得授权，非商业转载请注明出处，违者必究。</li>
                <li><entry_title>本文链接</entry_title>: </li>
            </ul>
        </div>
        <!-- Bar -->
        <div class="base_block_bar indicate_source_block_bar"></div>
        <!-- Catalogue -->
        <div class="div_catalogue" id="div_catalogue">
            <div class="div_load_catalogue_alert" id="load_catalogue_alert">正在加载目录...</div>
            <div class="div_catalogue_container" id="catalogue_container"></div>
        </div>
    </div>
    </div>
*/
async function _load_metadata(){
    // 获取本文 Metadata Json
    fetch('./metadata.json')
    .then((res) => {return res.json();})
    .then((meta_entries) => {
        // 获取语言
        language = `${meta_entries.language}`

        // 获取最外层 block，并设置样式
        let metadata_block = document.getElementById('metadata')
        metadata_block.setAttribute('class', 'base_block indicate_source_block')

        // 创建 container，并设置样式
        let block_container = document.createElement('div')
        block_container.setAttribute('class', 'base_block_container indicate_source_block_container')
        metadata_block.append(block_container)

        // 创建 title container 内的相关内容 (也即 About This Post)
        let block_title_container = document.createElement('div')
        block_title_container.setAttribute('class', 'base_block_title_container indicate_source_block_title_container')
        block_container.append(block_title_container)
        // 按钮
        let show_catalogue_button = document.createElement('button')
        show_catalogue_button.setAttribute('onclick', '_show_catalogue()')
        show_catalogue_button.setAttribute('id', 'show_catalogue_btn')
        if(language === 'cn')
            show_catalogue_button.innerHTML = '显示目录'
        else
            show_catalogue_button.innerHTML = 'Show Catalogue'
        block_title_container.append(show_catalogue_button)
        // 标志
        let icon = document.createElement('img')
        icon.setAttribute('src', './pic/source_sign.png')
        icon.setAttribute('width', '30px')
        block_title_container.append(icon)
        // 文字
        let title_words = document.createElement('p')
        title_words.innerHTML = 'About This Post'
        block_title_container.append(title_words)

        // 创建 Bar
        let bar_1 = document.createElement('div')
        bar_1.setAttribute('class', 'base_block_bar indicate_source_block_bar')
        block_container.append(bar_1)

        // 创建 content container 内的相关内容
        let block_content_container = document.createElement('div')
        block_content_container.setAttribute('class', 'base_block_content_container indicate_source_block_content_container')
        block_container.append(block_content_container)
        // ul
        let block_content_ul = document.createElement('ul')
        block_content_container.append(block_content_ul)
        // li
        // ---- author
        let author_li = document.createElement('li')
        let author_entry_title = document.createElement('entry_title')
        if(language === 'cn')
            author_entry_title.innerHTML = '作者: '
        else
            author_entry_title.innerHTML = 'Author: '
        author_li.innerHTML = `${meta_entries.author}`
        author_li.insertBefore(author_entry_title,author_li.firstChild)
        block_content_ul.append(author_li)
        // ---- date
        let date_li = document.createElement('li')
        let date_entry_title = document.createElement('entry_title')
        if(language === 'cn')
            date_entry_title.innerHTML = '日期: '
        else
            date_entry_title.innerHTML = 'Date: '
        date_li.innerHTML = `${meta_entries.date}`
        date_li.insertBefore(date_entry_title,date_li.firstChild)
        block_content_ul.append(date_li)
        // ---- copyright
        let copyright_li = document.createElement('li')
        let copyright_entry_title = document.createElement('entry_title')
        if(language === 'cn')
            copyright_entry_title.innerHTML = '版权: '
        else
            copyright_entry_title.innerHTML = 'Copyright: '
        if(language === 'cn')
            copyright_li.innerHTML = `${meta_entries.copyright_cn}`
        else
            copyright_li.innerHTML = `${meta_entries.copyright_en}`
        copyright_li.insertBefore(copyright_entry_title,copyright_li.firstChild)
        block_content_ul.append(copyright_li)
        // ---- link
        let link_li = document.createElement('li')
        let link_entry_title = document.createElement('entry_title')
        if(language === 'cn')
            link_entry_title.innerHTML = '本文地址: '
        else
            link_entry_title.innerHTML = 'Post Address: '
        if(meta_entries.link !== ''){
            link_li.innerHTML = `${meta_entries.link}`
        } else {
            link_li.innerHTML = `${window.location.href}`
        }
        link_li.insertBefore(link_entry_title,link_li.firstChild)
        block_content_ul.append(link_li)

        // 创建 Bar
        let bar_2 = document.createElement('div')
        bar_2.setAttribute('class', 'base_block_bar indicate_source_block_bar')
        block_container.append(bar_2)

        // 创建 Catalogue Container 内的相关内容
        let catalogue_container = document.createElement('div')
        catalogue_container.setAttribute('class', 'div_catalogue_disappear')
        catalogue_container.style.display = 'none'
        catalogue_container.setAttribute('id', 'div_catalogue')
        block_container.append(catalogue_container)
        // 创建 Alert
        let load_catalogue_alert_container = document.createElement('div')
        load_catalogue_alert_container.setAttribute('class', 'div_load_catalogue_alert')
        load_catalogue_alert_container.setAttribute('id', 'load_catalogue_alert')
        load_catalogue_alert_container.innerHTML = '正在加载目录...'
        catalogue_container.append(load_catalogue_alert_container)
        // 创建目录 Container
        let real_catalogue_container = document.createElement('div')
        real_catalogue_container.setAttribute('class', 'div_catalogue_container')
        real_catalogue_container.setAttribute('id', 'catalogue_container')
        catalogue_container.append(real_catalogue_container)

        // 加载目录
        _load_catalogue().then( 
            (return_struct)=>{ 
                document.getElementById('load_catalogue_alert').style.display = 'none'

                let label_list = return_struct.label_list
                _load_reference(label_list)
            }
        )
    })
}

// 处理文章中所有的 paragraphs
async function _load_paragraph(){
    let paragraphs = document.getElementsByClassName("paragraph")
    for(let i = 0; i < paragraphs.length; i++){
        paragraphs[i].setAttribute('style', 'color:#0074D9;')
        paragraphs[i].innerHTML = `❐ ${paragraphs[i].innerHTML}`
    }
}

// 处理文章中所有的 Sign Block
async function _load_sign_block() {
    // note block
    let note_blocks = document.getElementsByTagName("noteblock")
    for(let i = 0; i < note_blocks.length; i++){
        note_block = note_blocks[i]

        // 创建 block
        let elements = __create_block("note", "./pic/note_sign.png", "Note")

        // 将创建的 block 放在相应位置
        note_block.parentNode.insertBefore(elements[0], note_block.nextElementSibling)

        // 将 note_block 放入创建的 block 的 block_content_container 中
        elements[3].append(note_block)
    }

    // question block
    let question_blocks = document.getElementsByTagName("queblock")
    for(let i = 0; i < question_blocks.length; i++){
        question_block = question_blocks[i]

        // 创建 block
        let elements = __create_block("question", "./pic/question_sign.png", "Question")

        // 将创建的 block 放在相应位置
        question_block.parentNode.insertBefore(elements[0], question_block.nextElementSibling)

        // 将 question_block 放入创建的 block 的 block_content_container 中
        elements[3].append(question_block)
    }
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

// 处理文章中所有的 Flowchart
async function _load_flow_chart(){
    let flowchart_index_list = new Array()
    let flowchart_containers = document.getElementsByTagName("flowchart")

    console.log(flowchart_containers.length)

    // 记录所有 flowchart 的编号，并且在 flowchart div 中标识 flowchart 的序号
    for(let i = 0; i < flowchart_containers.length; i++){
        // 设置 id 和 name
        flowchart_containers[i].setAttribute("id",`flowchart_${i+1}`)
        flowchart_containers[i].setAttribute('name', `flowchart_${flowchart_containers[i].id}`)

        // 记录 label
        let flowchart_label = flowchart_containers[i].getAttribute('label')
        flowchart_index_list[flowchart_label] = i+1

        // 创建标号
        let flowchart_index = document.createElement('flowchart_index')
        if(!flowchart_containers[i].title)
            flowchart_index.innerHTML = `FlowChart ${i+1}`
        else
            flowchart_index.innerHTML = `FlowChart ${i+1}: ${flowchart_containers[i].title}`

        // 在 flowchart 外面包上一个 container
        let flowchart_container_wrapper = document.createElement('div')
        flowchart_container_wrapper.setAttribute("class", "flowchart_wrapper")
        flowchart_containers[i].parentNode.insertBefore(flowchart_container_wrapper, flowchart_containers[i].nextElementSibling)
        flowchart_container_wrapper.appendChild(flowchart_containers[i])

        // 显示标号
        insertAfter(flowchart_index, flowchart_containers[i])
    }

    // 替换所有的 Flowchart 引用
    let flowchart_refs = document.getElementsByTagName("flowchartref")
    for(let i = 0; i < flowchart_refs.length; i++){
         // 获取 Flowchart 标识号
         let selected_flowchart_index = flowchart_index_list[flowchart_refs[i].innerHTML]

        // 创建链接
        let flowchart_link = document.createElement('a')
        flowchart_link.setAttribute('href', `#flowchart_${selected_flowchart_index}`)

        // 修改 flowchartref 的内部内容
        flowchart_link.innerHTML = `FlowChart ${selected_flowchart_index}`

        // 塞入原先位置
        flowchart_refs[i].innerHTML = ''
        flowchart_refs[i].append(flowchart_link)
    }
}

// 处理文章中所有水印
async function __load_watermark(){
    let imgs = document.getElementsByTagName('img')

    for(let i = 0; i < imgs.length; i++){
        // 组合出水印图片的路径
        let img = imgs[i]
        let img_path = img.getAttribute('src')
        let img_file = img_path.substring(img_path.lastIndexOf('/')+1);
        let img_dict = img_path.substring(0,-1+img_path.length-img_file.length);
        //let watermark_file = 'watermark_' + img_file
        let watermark_file = 'watermark/' + img_file
        let watermark_img_path  = img_dict + '/' + watermark_file

        // 判断水印文件是否存在，若存在则替换
        let img_obj = new Image();
        img_obj.onload = function(){
            img.setAttribute('src', watermark_img_path)
        }
        img_obj.src= watermark_img_path;
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

    // 处理水印
    __load_watermark()
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
    let code_segment_button_content = code_segment_button.firstChild

    if(code_segment_container.className == 'div_code_container_disapear'){
        code_segment_container.style.display = ''
        code_segment_container.setAttribute('class', 'div_code_container')
        code_segment_button_content.innerHTML = `Hide Codes`
    } else {
        code_segment_container.setAttribute('class', 'div_code_container_disapear')
        code_segment_button_content.innerHTML = `Show Codes`
        setTimeout(function() { code_segment_container.style.display = 'none'; }, 300);
    }
}

// 处理文章中所有的代码段
async function _load_code_segment(){
    let code_segments = document.getElementsByTagName('figure')

    function __process_language_name(language){
        if(language == 'python') return 'Python'
        else if(language == 'bash') return 'Bash Script'
        else if(language == 'cpp') return 'C++'
        else if(language == 'c') return 'C'
        else if(language == 'go' || language == 'golang') return 'Golang'
        else return language
    }

    for(let i = 0; i < code_segments.length; i++){
        // 获取代码段语言
        let code_segment_language = __process_language_name(`${code_segments[i].classList[1]}`)

        // 创建一个按钮
        let code_segment_btn = document.createElement('button')
        code_segment_btn.setAttribute('type', 'button')
        code_segment_btn.setAttribute('id', `code_segment_${i}`)
        code_segment_btn.setAttribute('onclick', '_show_code_segment(id)')
        code_segment_btn.setAttribute('language', code_segment_language)

        // 创建按钮内容 - 按钮文字
        let code_segment_btn_content = document.createElement('div')
        code_segment_btn_content.setAttribute('class', 'div_code_segment_button_sign')
        code_segment_btn_content.innerHTML = `Hide Codes`

        // 创建按钮内容 - 语言类型
        let code_segment_btn_language_type = document.createElement('div')
        code_segment_btn_language_type.setAttribute('class', 'div_code_segment_language_type')
        code_segment_btn_language_type.innerHTML = `${code_segment_language}`
        
        code_segment_btn.append(code_segment_btn_content)
        code_segment_btn.append(code_segment_btn_language_type)

        // 在代码段外面包上一个 container
        let code_segment_container = document.createElement('div')
        code_segments[i].parentNode.insertBefore(code_segment_container, code_segments[i].nextElementSibling)
        code_segment_container.appendChild(code_segments[i])

        // 设置 container 属性，以及暂时设置为不可见
        code_segment_container.setAttribute('id', `container_code_segment_${i}`)
        code_segment_container.setAttribute('class', `div_code_container`)
        // code_segment_container.style.display = 'none'    // 不可见
        code_segment_container.style.display = ''       // 可见

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

function __create_block(block_name, sign_img_path, title){
    let ret = new Array();

    // 获取最外层 block，并设置样式
    let block = document.createElement('div')
    block.setAttribute('class', `base_block ${block_name}_block`)
    ret[0] = block

    // 创建 container，并设置样式
    let block_container = document.createElement('div')
    block_container.setAttribute('class', `base_block_container ${block_name}_block_container`)
    block.append(block_container)
    ret[1] = block_container

    // 创建 title container 内的相关内容
    let block_title_container = document.createElement('div')
    block_title_container.setAttribute('class', `base_block_title_container ${block_name}_block_title_container`)
    block_container.append(block_title_container)
    // 标志
    let icon = document.createElement('img')
    icon.setAttribute('src', `${sign_img_path}`)
    icon.setAttribute('width', '20px')
    block_title_container.append(icon)
    // 文字
    let title_words = document.createElement('p')
    title_words.innerHTML = `${title}`
    block_title_container.append(title_words)
    ret[2] = block_title_container

    // 创建 Bar
    let bar_1 = document.createElement('div')
    bar_1.setAttribute('class', `base_block_bar ${block_name}_block_bar`)
    block_container.append(bar_1)

    // 创建 content container，相关内容后续填充
    let block_content_container = document.createElement('div')
    block_content_container.setAttribute('class', `base_block_content_container ${block_name}_block_content_container`)
    block_container.append(block_content_container)
    ret[3] = block_content_container

    return ret
}