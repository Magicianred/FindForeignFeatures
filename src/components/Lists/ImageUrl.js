import React from 'react';
import NoImage from '../../Images/NoImage.png'
import '../../stylesheets/Lists/ImageUrl.css'

const ImageUrl = (props) =>  {
    let picSource = props.item.poster_path != null ? `https://image.tmdb.org/t/p/w500/${props.item.poster_path}` : NoImage
    return <img src={ picSource } alt={props.item.original_name + " poster."} id="poster"/>
}
    export default ImageUrl;