function selectPostClass(id){
    // control button
    if(id === "system"){
        // switch div
        let target_system = document.getElementById('system-knowledge');
        target_system.style.display="block";

        let target_non_archived = document.getElementById('non-archived-knowledge');
        target_non_archived.style.display="none";

        let target_paper = document.getElementById('paper-reading');
        target_paper.style.display="none";

        // set button style
        let button_system = document.getElementById('system');
        button_system.style.backgroundColor="#FF851B"

        let button_non_archived = document.getElementById('non_archived');
        button_non_archived.style.backgroundColor="#0074D9"

        let button_paper = document.getElementById('paper');
        button_paper.style.backgroundColor="#0074D9"
    }else if(id === "non_archived"){
        // switch div
        let target_system = document.getElementById('system-knowledge');
        target_system.style.display="none";

        let target_non_archived = document.getElementById('non-archived-knowledge');
        target_non_archived.style.display="block";

        let target_paper = document.getElementById('paper-reading');
        target_paper.style.display="none";

        // set button style
        let button_system = document.getElementById('system');
        button_system.style.backgroundColor="#0074D9"

        let button_non_archived = document.getElementById('non_archived');
        button_non_archived.style.backgroundColor="#FF851B"

        let button_paper = document.getElementById('paper');
        button_paper.style.backgroundColor="#0074D9"
    }else if(id === "paper"){
        // switch div
        let target_system = document.getElementById('system-knowledge');
        target_system.style.display="none";

        let target_non_archived = document.getElementById('non-archived-knowledge');
        target_non_archived.style.display="none";

        let target_paper = document.getElementById('paper-reading');
        target_paper.style.display="block";

        // set button style
        let button_system = document.getElementById('system');
        button_system.style.backgroundColor="#0074D9"

        let button_non_archived = document.getElementById('non_archived');
        button_non_archived.style.backgroundColor="#0074D9"

        let button_paper = document.getElementById('paper');
        button_paper.style.backgroundColor="#FF851B"
    }
}