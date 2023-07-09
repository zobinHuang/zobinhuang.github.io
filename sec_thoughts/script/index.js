function load_weekly_list(){
    fetch('/sec_thoughts/thought_index.json')
    .then((res) => {return res.json();})
    .then((data) => {
        let all_thought_meta = data.all_thought_meta
        let all_year_meta = data.all_year_meta

        let thought_outside_container = document.getElementById("thought-outside-container");
        let weekly_report_showcase = document.getElementById("thought-showcase");

        let current_record_year = 0
        let current_showcase = null
        
        for(let i = 0; i < all_thought_meta.length; i++){
            let thought_meta = all_thought_meta[i];
            
            console.log(thought_meta)

            // skip empty index
            if(thought_meta.month === ""){
                continue;
            }

            // skip hidden index
            if(thought_meta.hidden){
                continue;
            }

            if(thought_meta.year !== current_record_year){
                // 记录当前在记录的年份
                current_record_year = thought_meta.year
                
                // 获得这个年份的相关信息
                let year_meta = all_year_meta.filter(year_meta => {
                    return year_meta.year === current_record_year
                })[0]

                if(year_meta){
                    // 创建年份标题 Container
                    let year_title_outside_container = document.createElement("div")
                    year_title_outside_container.setAttribute("class", "thought-year-container")
                    thought_outside_container.append(year_title_outside_container)

                    // 创建年份标题 本体
                    let year_title_container = document.createElement("div")
                    year_title_container.setAttribute("class", "thought-year-title-container")
                    let year_title_h4 = document.createElement("h4")
                    let year_title_h5 = document.createElement("h5")
                    year_title_h4.innerHTML = `${current_record_year}`
                    year_title_h5.innerHTML = `${year_meta.meaning}`
                    year_title_container.append(year_title_h4)
                    year_title_container.append(year_title_h5)
                    year_title_outside_container.append(year_title_container)

                    // 创建该年份的头像组
                    let year_avatar_group = document.createElement("div")
                    year_avatar_group.setAttribute("class", "thought-year-avatar-group-container")
                    year_title_outside_container.append(year_avatar_group)
                    for(let j = 0; j < year_meta.avatars.length; j++){
                        let avatar_meta = year_meta.avatars[j]
                        let avatar = document.createElement("div")
                        avatar.setAttribute("class", "thought-year-avatar")
                        avatar.style.backgroundImage = `url(./pic/avatars/${current_record_year}/${avatar_meta.pic_file})`
                        year_avatar_group.append(avatar)
                    }
                }
                
                // 创建该年份的 showcase
                let current_year_showcase = document.createElement("div")
                current_year_showcase.setAttribute("class", "thought-showcase")
                current_showcase = current_year_showcase
                thought_outside_container.append(current_showcase)
            }

            // get local url
            let weekly_local_url = `/sec_thoughts/${thought_meta.year}_${thought_meta.month}_${thought_meta.day}_${thought_meta.short}`;

            // ----------------------- make showcase for each weekly -----------------------

            // outside container
            let weekly_report_current_report_container = document.createElement("div");
            weekly_report_current_report_container.setAttribute("class", "weekly-report-current-report-container")
            weekly_report_current_report_container.setAttribute("class", `${thought_meta.year}_${thought_meta.month}`)

            // link
            let weekly_report_link = document.createElement("a");
            weekly_report_link.setAttribute("href", `${weekly_local_url}/index.html`)
            

            // inside container
            let weekly_report_current_report = document.createElement("div");
            weekly_report_current_report.setAttribute("class", "weekly-report-current-report")
            
            // title
            let weekly_report_current_report_title_container = document.createElement("div");
            weekly_report_current_report_title_container.setAttribute("class", "weekly-report-current-report-title")
            let weekly_report_current_report_title_h2 = document.createElement("h2");
            weekly_report_current_report_title_h2.innerHTML = `${thought_meta.title}`
            let weekly_report_current_report_title_h5 = document.createElement("h5");
            weekly_report_current_report_title_h5.innerHTML = `${_get_month_string_by_id(thought_meta.month)} ${thought_meta.day}, ${thought_meta.year}`
            weekly_report_current_report_title_container.append(weekly_report_current_report_title_h2)
            weekly_report_current_report_title_container.append(weekly_report_current_report_title_h5)
            

            // check whether cover exist
            let cover_url = `${weekly_local_url}/pic/${thought_meta.cover_file}`
            let is_cover_exist = _image_exists(cover_url)

            // cover
            let weekly_report_current_report_image_container = document.createElement("div");
            weekly_report_current_report_image_container.setAttribute("class", "weekly-report-current-report-image")
            let weekly_report_current_report_image = document.createElement("img");
            weekly_report_current_report_image.setAttribute("class", `${thought_meta.cover_style}`)
            weekly_report_current_report_image.setAttribute("src", cover_url)
            weekly_report_current_report_image_container.append(weekly_report_current_report_image)

            // brief
            let weekly_report_current_report_intro_container = document.createElement("div");
            weekly_report_current_report_intro_container.setAttribute("class", "weekly-report-current-report-intro")
            let weekly_report_current_report_intro = document.createElement("p");
            weekly_report_current_report_intro.innerHTML = `${thought_meta.brief}`
            weekly_report_current_report_intro_container.append(weekly_report_current_report_intro)

            weekly_report_current_report.append(weekly_report_current_report_title_container)
            if(is_cover_exist){
                weekly_report_current_report.append(weekly_report_current_report_image_container)
            }
            weekly_report_current_report.append(weekly_report_current_report_intro_container)
            weekly_report_link.append(weekly_report_current_report)
            weekly_report_current_report_container.append(weekly_report_link)
            current_showcase.append(weekly_report_current_report_container)
        }
    })
}

function _image_exists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;

}

function _get_month_string_by_id(month_id) {
    switch (month_id) {
        case "1":
            return "Jan."
        case "2":
            return "Feb."
        case "3":
            return "Mar."
        case "4":
            return "Apr."
        case "5":
            return "May"
        case "6":
            return "June"
        case "7":
            return "July"
        case "8":
            return "Aug."
        case "9":
            return "Sept."
        case "10":
            return "Oct."
        case "11":
            return "Nov."
        case "12":
            return "Dec."
        default:
            return `UNKNOWN MONTH ID ${month_id}`
    }
}