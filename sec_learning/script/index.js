function load_page(){
    _count_post_num()
}

function _count_post_num(){
    fetch('./script/book_index.json')
    .then((res) => {return res.json();})
    .then((book_indices) => {
        for(let i=0; i<book_indices.length; i++){
            let book_index = book_indices[i]
            console.log(book_index)

            // create count outer container
            let target_div = document.getElementById(`Entry_${book_index.book_url}`)
            let count_outer_container = document.createElement('div')
            count_outer_container.setAttribute("class", "count_outer_container")
            target_div.append(count_outer_container)

            // create count container
            for(let j=0; j<book_index.counts.length; j++){
                let count_meta = book_index.counts[j];
                let count_container = document.createElement('div')
                count_container.setAttribute("class", "count_container")
                if(count_meta.class === "system-knowledge"){
                    count_container.innerHTML = `# Technical Posts: `
                } else if (count_meta.class === "paper-reading"){
                    count_container.innerHTML = `# Paper Reading Notes: `
                } else if (count_meta.class === "non-archived-knowledge"){
                    count_container.innerHTML = `# Non-archived Posts: `
                }
                let counter = document.createElement('counter')
                counter.innerHTML = `${count_meta.count}`
                count_container.append(counter)
                
                count_outer_container.append(count_container)
            }
        }
    })
}