async function _load_code_segment(){
    let code_segments = document.getElementsByTagName('figure')
    for(let i = 0; i < code_segments.length; i++){
        // 创建一个 container，塞在 <figure> 里面
        let code_segment_container = document.createElement('div')
        insertAfter(code_segment_container, code_segments[i])

        // 设置 container 属性
        code_segment_container.setAttribute('class', 'div_code_segment')
        code_segment_container.setAttribute('id', `code_segment_${i}`)

        // 创建一个按钮
        let code_segment_btn = document.createElement('button')
        code_segment_btn.setAttribute('type', 'button')
        code_segment_btn.setAttribute('id', `code_segment_btn_${i}`)
        code_segment_btn.setAttribute('onclick', '_show_code_segment()')
        code_segment_btn.innerHTML = '点击显示代码段'
        
        // 把代码段和按钮塞到 container 中
        code_segment_container.append(code_segment_btn)
        code_segment_container.append(code_segments[i])

        // 设置 container 为暂时不可见
        code_segment_container.style.display = 'none'
    }
}