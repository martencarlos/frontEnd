
import "../css/uploadImage.css";

import { useState, useEffect } from "react";

export default function UploadImage(){
    const [images, setImages] = useState([])
    const [imagesURLs, setImageURLs] = useState([])

    useEffect(()=>{
        if(images.legth < 1) return;
        const newImageURLs = []
        images.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
        setImageURLs(newImageURLs)
    },[images])

    function onImageChange(e){
        setImages([...e.target.files])
    }

    return(
        <div className="imageUpload">
            <input type="file" multiple accept="image/*" onChange={onImageChange}/>
            {imagesURLs.map(imageSrc => <img alt="" className="userImagePreview" src={imageSrc}/>)}
        </div>
    )
}