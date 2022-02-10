function load_weekly_list(){
    fetch('/sec_weekly/weekly_index.json')
    .then((res) => {return res.json();})
    .then((all_weekly) => {

        let weekly_report_showcase = document.getElementById("weekly-report-showcase");

        for(let i = 0; i < all_weekly.length; i++){
            let weekly = all_weekly[i];

            // skip empty index
            if(weekly.month === ""){
                continue;
            }

            // get local url
            let weekly_local_url = `/sec_weekly/${weekly.year}_${weekly.month}_w${weekly.week_index}`;

            // ----------------------- make showcase for each weekly -----------------------

            // outside container
            let weekly_report_current_report_container = document.createElement("div");
            weekly_report_current_report_container.setAttribute("class", "weekly-report-current-report-container")
            weekly_report_current_report_container.setAttribute("class", `${weekly.year}_${weekly.month}`)

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
            weekly_report_current_report_title_h2.innerHTML = `${weekly.title}`
            let weekly_report_current_report_title_h5 = document.createElement("h5");
            weekly_report_current_report_title_h5.innerHTML = `${weekly.year} 年 ${weekly.month} 月第 ${weekly.week_index} 周`
            weekly_report_current_report_title_container.append(weekly_report_current_report_title_h2)
            weekly_report_current_report_title_container.append(weekly_report_current_report_title_h5)
            

            // cover
            let weekly_report_current_report_image_container = document.createElement("div");
            weekly_report_current_report_image_container.setAttribute("class", "weekly-report-current-report-image")
            let weekly_report_current_report_image = document.createElement("img");
            weekly_report_current_report_image.setAttribute("class", `${weekly.cover_style}`)
            weekly_report_current_report_image.setAttribute("src", `${weekly_local_url}/pic/cover.png`)
            weekly_report_current_report_image_container.append(weekly_report_current_report_image)

            // brief
            let weekly_report_current_report_intro_container = document.createElement("div");
            weekly_report_current_report_intro_container.setAttribute("class", "weekly-report-current-report-intro")
            let weekly_report_current_report_intro = document.createElement("p");
            weekly_report_current_report_intro.innerHTML = `${weekly.cover_brief}`
            weekly_report_current_report_intro_container.append(weekly_report_current_report_intro)

            weekly_report_current_report.append(weekly_report_current_report_title_container)
            weekly_report_current_report.append(weekly_report_current_report_image_container)
            weekly_report_current_report.append(weekly_report_current_report_intro_container)
            weekly_report_link.append(weekly_report_current_report)
            weekly_report_current_report_container.append(weekly_report_link)
            weekly_report_showcase.append(weekly_report_current_report_container)
        }

        weekly_report_showcase.setAttribute("class", "weekly-report-showcase")
    })
}