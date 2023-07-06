function load_weekly_list(){
    fetch('/sec_thoughts/thought_index.json')
    .then((res) => {return res.json();})
    .then((all_thought_meta) => {
        let weekly_report_showcase = document.getElementById("weekly-report-showcase");

        for(let i = 0; i < all_thought_meta.length; i++){
            let thought_meta = all_thought_meta[i];

            // skip empty index
            if(thought_meta.month === ""){
                continue;
            }
            
            // skip hidden index
            if(thought_meta.hidden){
                continue;
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
            let cover_url = `${weekly_local_url}/pic/cover.png`
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
            weekly_report_showcase.append(weekly_report_current_report_container)
        }

        weekly_report_showcase.setAttribute("class", "weekly-report-showcase")
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