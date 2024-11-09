function load_mainpage(){
    // _load_recents()
}

document.addEventListener('DOMContentLoaded', async function() {
    await _load_recents()
    for(let i = 0; i < window.all_recents_length; i++){
        let img = document.getElementById(`recent_img_${i}`)
        
        img.onload = () => {
            let content_container = document.getElementById(`recent_content_container_${i}`)
            let height = img.offsetHeight
            content_container.style.maxHeight = `${height}px`
        }
    }
});


async function _load_recents(){
    return fetch('./scripts/recents.json')
    .then((res) => {return res.json();})
    .then(async (json_raw) => {
        let max_show_length = json_raw.max_show_length
        let all_recents = json_raw.recents

        let recents_container = document.getElementById("recents_container")

        window.all_recents_length = all_recents.length > max_show_length ? max_show_length : all_recents.length;
        for(let i = 0; i < all_recents.length; i++){
            if(i >= max_show_length){ break; }

            let recent = all_recents[i]
            let recent_entry_container = document.createElement("div");
            recent_entry_container.setAttribute("class", "recent_entry_container")
            recents_container.append(recent_entry_container)

            let img_container = document.createElement("div");
            img_container.setAttribute("id", `recent_img_container_${i}`)
            img_container.setAttribute("class", "img_container")
            recent_entry_container.append(img_container)
            
            // append image
            let img = document.createElement("img");
            img.setAttribute("src", recent["img"])
            img.setAttribute("id", `recent_img_${i}`)
            img_container.append(img)
        
            let content_container = document.createElement("div");
            content_container.setAttribute("class", "content_container")
            content_container.setAttribute("id", `recent_content_container_${i}`)
            
            recent_entry_container.append(content_container)

            let title_container = document.createElement("div");
            title_container.setAttribute("class", "title_container")
            content_container.append(title_container)

            // add title
            let h2 = document.createElement("h2");
            title_container.append(h2)
            h2.innerHTML = recent["title"]

            // add date
            let date = document.createElement("date");
            date.innerHTML = recent["date"]
            h2.prepend(date);
            
            // add desp
            let desp_container = document.createElement("div");
            content_container.append(desp_container)
            desp_container.setAttribute("class", "desp_container")
            desp_container.innerHTML = recent["description"]

            // append code / press / paper links
            if(recent["links"] && recent["links"].length > 0){
                let links_container = document.createElement("div");
                links_container.setAttribute("class", "links_container")
                desp_container.prepend(links_container)

                for(let j=0; j<recent["links"].length; j++){
                    let link = recent["links"][j]
                    let aa = document.createElement("a");
                    aa.setAttribute("href", link["link"])
                    aa.innerHTML = `[${link["name"]}]`
                    links_container.append(aa)
                }
            }
        }  
    })
}


function _get_image_size(imagePath) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            resolve({"width": img.width, "height": img.height});
        };

        img.onerror = () => {
            reject(new Error('无法加载图片'));
        };
    });
}


function _load_weekly(){
    let max_list_length = 5;

    fetch('/sec_weekly/weekly_index.json')
    .then((res) => {return res.json();})
    .then((all_weekly) => {
        // ----------------------- Step 1: fullfill list --------------------------------
        let listed_weekly = 0;
        let weekly_list = document.getElementById("weekly-report-list")
        for(let i = 0; i < all_weekly.length; i++){
            let weekly = all_weekly[i];

            // skip empty index
            if(weekly.month === ""){
                continue;
            }

            // limit max listed weekly
            if(listed_weekly === max_list_length){
                break;
            }

            // get local url
            let weekly_local_url = `/sec_weekly/${weekly.year}_${weekly.month}_w${weekly.week_index}`;
            
            let new_list_entry = document.createElement("li");
            let new_list_entry_link = document.createElement("a");
            new_list_entry_link.setAttribute("href", `${weekly_local_url}/index.html`)
            new_list_entry_link.innerHTML = `${weekly.year} 年 ${weekly.month} 月第 ${weekly.week_index} 周：${weekly.title}`
            new_list_entry.append(new_list_entry_link)
            weekly_list.append(new_list_entry)

            // add listed weekly
            listed_weekly = listed_weekly + 1;
        }

        // add read more link
        let readmore_list_entry = document.createElement("li");
        let readmore_list_entry_link = document.createElement("a");
        readmore_list_entry_link.setAttribute("href", `/sec_weekly/index.html`)
        readmore_list_entry_link.innerHTML = `阅读更多「往周故事」`
        readmore_list_entry.append(readmore_list_entry_link)
        weekly_list.append(readmore_list_entry)

        // ----------------------- Step 2: update current weekly --------------------------------
        let current_weekly = all_weekly[1];
        let current_weekly_local_url = `/sec_weekly/${current_weekly.year}_${current_weekly.month}_w${current_weekly.week_index}`;

        // update link
        let current_weekly_link = document.getElementById("weekly-report-current-report-link");
        current_weekly_link.setAttribute("href", `${current_weekly_local_url}/index.html`)

        // update title and date
        let current_weekly_title = document.getElementById("weekly-report-current-report-title");
        let current_weekly_title_h2 = document.createElement("h2");
        current_weekly_title_h2.innerHTML = `本周封面：${current_weekly.title}`
        let current_weekly_title_h5 = document.createElement("h5");
        current_weekly_title_h5.innerHTML = `${current_weekly.year} 年 ${current_weekly.month} 月第 ${current_weekly.week_index} 周`
        current_weekly_title.append(current_weekly_title_h2)
        current_weekly_title.append(current_weekly_title_h5)

        // update cover
        let current_weekly_img_container = document.getElementById("weekly-report-current-report-image");
        let current_weekly_img = document.createElement("img");
        current_weekly_img.setAttribute("class", `${current_weekly.cover_style}`)
        current_weekly_img.setAttribute("src", `${current_weekly_local_url}/pic/cover.png`)
        current_weekly_img_container.append(current_weekly_img)
        
        // update cover brief
        let current_weekly_intro_container = document.getElementById("weekly-report-current-report-intro");
        let current_weekly_intro = document.createElement("p");
        current_weekly_intro.innerHTML = `${current_weekly.cover_brief}`
        current_weekly_intro_container.append(current_weekly_intro)
    })
}