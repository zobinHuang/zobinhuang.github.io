for pic in *.png; do
    # 跳过转载图片
    if [[ ${pic%%_*} = "other" ]]
    then
        continue
    fi

    # 跳过标志图片
    if [[ $pic = "question_sign.png" ]]
    then
        continue
    fi
    if [[ $pic = "note_sign.png" ]]
    then
        continue
    fi
    if [[ $pic = "source_sign.png" ]]
    then
        continue
    fi
    if [[ $pic = "source_sign.png" ]]
    then
        continue
    fi

    # 跳过本身打水印的图片
    if [[ ${pic%%_*} = "watermark" ]]
    then
        continue
    fi
    
    echo processing $pic

    # 获取图片信息
    pic_meta="$(identify $pic)"
    pic_meta_array=(${pic_meta// / })
    pic_width_height=${pic_meta_array[2]}
    pic_width_height_array=(${pic_width_height//x/ })
    pic_width=${pic_width_height_array[0]}
    pic_height=${pic_width_height_array[1]}

    # 计算水印参数
    grey_wm_col=2
    grey_wm_row=2
    grey_wm_interval_width=`expr $pic_width / $grey_wm_col`
    grey_wm_interval_height=`expr $pic_height / $grey_wm_row`
    grey_wm_interval_width_height=$grey_wm_interval_width"x"$grey_wm_interval_height
    grey_wm_width=`expr $pic_width / 60`
    pink_wm_width=`expr $pic_width / 50`
    # pink_wm_x=`expr $pic_width - $grey_wm_width`
    # pink_wm_y=`expr $pic_height - $grey_wm_width`
    # pink_wm_x_y="+"$pink_wm_x"+"$pink_wm_y

    # 加第一层水印: 背景灰色水印
    convert -size $grey_wm_interval_width_height -font Times-New-Roman -pointsize $grey_wm_width xc:none -fill grey \
        -gravity NorthWest -annotate +10x10 "Zhuobin Huang" \
        -gravity SouthEast -annotate +10x10 "zobin1999@gmail.com" \
        miff:- |\
    composite -tile - $pic  ./watermark/$pic

    # 加第二层水印: 右侧 @ 水印
    convert ./watermark/$pic  -font Arial -pointsize $pink_wm_width \
        -draw "gravity northeast \
                fill pink text 0,12 'Pic By @Zhuobin Huang' "\
        ./watermark/$pic
done


for pic in *.jpg; do
    # 跳过转载图片
    if [[ ${pic%%_*} = "other" ]]
    then
        continue
    fi

    # 跳过本身打水印的图片
    if [[ ${pic%%_*} = "watermark" ]]
    then
        continue
    fi
    
    echo processing $pic

    # 获取图片信息
    pic_meta="$(identify $pic)"
    pic_meta_array=(${pic_meta// / })
    pic_width_height=${pic_meta_array[2]}
    pic_width_height_array=(${pic_width_height//x/ })
    pic_width=${pic_width_height_array[0]}
    pic_height=${pic_width_height_array[1]}

    # 计算水印参数
    grey_wm_col=2
    grey_wm_row=2
    grey_wm_interval_width=`expr $pic_width / $grey_wm_col`
    grey_wm_interval_height=`expr $pic_height / $grey_wm_row`
    grey_wm_interval_width_height=$grey_wm_interval_width"x"$grey_wm_interval_height
    grey_wm_width=`expr $pic_width / 60`
    pink_wm_width=`expr $pic_width / 50`
    # pink_wm_x=`expr $pic_width - $grey_wm_width`
    # pink_wm_y=`expr $pic_height - $grey_wm_width`
    # pink_wm_x_y="+"$pink_wm_x"+"$pink_wm_y

    # 加第一层水印: 背景灰色水印
    convert -size $grey_wm_interval_width_height -font Times-New-Roman -pointsize $grey_wm_width xc:none -fill grey \
        -gravity NorthWest -annotate +10x10 "Zhuobin Huang" \
        -gravity SouthEast -annotate +10x10 "zobin1999@gmail.com" \
        miff:- |\
    composite -tile - $pic  ./watermark/$pic

    # 加第二层水印: 右侧 @ 水印
    convert ./watermark/$pic  -font Arial -pointsize $pink_wm_width \
        -draw "gravity northeast \
                fill pink text 0,12 'Pic By @Zhuobin Huang' "\
        ./watermark/$pic
done