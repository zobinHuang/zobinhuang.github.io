/* 搜索引擎 */
function search(){

    // 获取关键词
    let keyword = document.getElementById("search_input").value;

    if(keyword === ""){
        alert('请输入搜索内容')
        return
    }

    // 清空原有搜索结果
    let search_showcase = document.getElementById('search_show_case')
    search_showcase.innerHTML = ""
    
    // 获取整体 div
    let search_showcase_container = document.getElementById("search_show_case_container")
    
    // 搜索条目数量
    let search_number = 0

    // 添加标题
    let search_showcase_title = document.getElementById("search_show_case_title")
    search_showcase_title.innerHTML = ""
    let search_showcase_title_h = document.createElement("h2");
    search_showcase_title_h.innerHTML = `搜索结果：包含 "${keyword}" 的文章，共 ${search_number} 篇`;
    search_showcase_title.append(search_showcase_title_h);

    // 设置关闭按钮
    let search_showcase_close_button_container = document.createElement("div");
    search_showcase_close_button_container.setAttribute("class", "search_showcase_close_button_container")
    let search_showcase_close_button = document.createElement("button");
    search_showcase_close_button.setAttribute("onclick", "close_search()")
    search_showcase_close_button.innerHTML = "关闭搜索"
    search_showcase_close_button_container.append(search_showcase_close_button)
    search_showcase_title.append(search_showcase_close_button_container)

    /* 获取所有书目 */
    fetch('./script/book_index.json')
    .then((res) => {return res.json();})
    .then((books) => {

        /* 获取各个书目中的 URL */
        for(let i = 0; i < books.length; i++){
            let book_meta = books[i]

            console.log(`LOG: analyse book url: /sec_learning/${book_meta.book_url} for book ${book_meta.book_name}`);

            /* 读取各个书目列表下的清单文件 */
            fetch(`/sec_learning/${book_meta.book_url}/post_index.json`)
            .then((res) => {return res.json();})
            .then((book) => {
                
                /* 获取各个书目中的归类：科研文章、工程文章和未归档文章等 */
                for(let j = 0; j < book.length; j++){
                    let book_content = book[j]

                    console.log(`LOG:     analyse ${book_content.post_class} part`)
                    
                    /* 获取归类中的各个模块 */
                    for(let k = 0 ; k < book_content.modules.length; k++){
                        let book_module = book_content.modules[k]

                        console.log(`LOG:         analyse ${book_module.post_module_name} part, url: ${book_module.post_module_url_prefix}, found ${book_module.posts.length} post(s)`)

                        /* match 各个 post 和想要搜索的关键词 */
                        for(let t = 0 ; t < book_module.posts.length; t++){
                            let post = book_module.posts[t]
                            
                            /* TODO：按网页来搜索 (好像没必要做在前端)*/
                            // let dest_url = `/sec_learning/${book_meta.book_url}/${book_module.post_module_url_prefix}_${post.post_name_url}/index.html`
                            // console.log(`LOG:            access url: ${dest_url} (TODO)`)

                            // 替代方案：直接 match json 的关键词
                            for (let p=0 ; p < post.keyword.length; p++){
                                let post_keyword = post.keyword[p];
                                // IMPORTANT：搜索匹配规则，后面优化
                                if ((keyword.toLowerCase().search(post_keyword.toLowerCase()) != -1 || post_keyword.toLowerCase().search(keyword.toLowerCase()) != -1)&& (post_keyword.length != 0)){
                                    /* 创建搜索结果 Container */
                                    let search_entry_container = document.createElement("div");
                                    search_entry_container.setAttribute("class", "search_entry_container");
                                    
                                    /* 创建跳转链接和标签 */
                                    let search_entry_link_container = document.createElement("div");
                                    search_entry_link_container.setAttribute("class", "search_entry_link")
                                    let search_entry_tag = document.createElement("div");
                                    if(book_content.post_class === 'system-knowledge'){
                                        search_entry_tag.setAttribute("class", "search_entry_tag_system");
                                    }else if(book_content.post_class === 'paper-reading'){
                                        search_entry_tag.setAttribute("class", "search_entry_tag_paper");
                                    }else if(book_content.post_class === 'non-archived-knowledge'){
                                        search_entry_tag.setAttribute("class", "search_entry_tag_non_archived");
                                    }else{
                                        search_entry_tag.setAttribute("class", "search_entry_tag_other");
                                    }
                                    search_entry_tag.innerHTML = `${book_content.post_class_tag}`
                                    search_entry_link_container.append(search_entry_tag)
                                    let search_entry_link = document.createElement("a");
                                    search_entry_link.setAttribute("href", `/sec_learning/${book_meta.book_url}/${book_module.post_module_url_prefix}_${post.post_name_url}/index.html`)
                                    search_entry_link.innerHTML = `${post.post_title}`
                                    search_entry_link_container.append(search_entry_link)
                                    search_entry_container.append(search_entry_link_container)

                                    /* 创建简介 */
                                    let search_entry_brief_container = document.createElement("div");
                                    search_entry_brief_container.setAttribute("class", "search_entry_brief")
                                    let search_entry_brief = document.createElement("p");
                                    search_entry_brief.innerHTML = `${post.post_brief}`
                                    search_entry_brief_container.append(search_entry_brief)
                                    search_entry_container.append(search_entry_brief_container)

                                    /* 创建定位信息 */
                                    let search_entry_source_container = document.createElement("div");
                                    search_entry_source_container.setAttribute("class", "search_entry_source")
                                    let search_entry_source = document.createElement("p");
                                    search_entry_source.innerHTML = `Source: 「${book_meta.book_name}」 -  【${book_module.post_module_name}】`
                                    search_entry_source_container.append(search_entry_source)
                                    search_entry_container.append(search_entry_source_container)
                                    
                                    search_showcase.append(search_entry_container)

                                    /* 更新数量 */
                                    search_number = search_number + 1;
                                    search_showcase_title_h.innerHTML = `搜索结果：包含 "${keyword}" 的文章，共 ${search_number} 篇`;

                                    break;
                                }
                            }
                        }
                    }
                }
            })
        }
    })
}

function close_search(){
    let search_showcase = document.getElementById('search_show_case')
    search_showcase.innerHTML = ""
    let search_showcase_title = document.getElementById("search_show_case_title")
    search_showcase_title.innerHTML = ""
}