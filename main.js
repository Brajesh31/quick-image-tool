const fileInput = document.getElementById("file");
const uploadBox = document.querySelector(".upload-box");
const previewImg = uploadBox.querySelector("img");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const quality = document.getElementById("quality");
const ratio = document.getElementById("ratio");
const download = document.querySelector(".download");

let ratioImg ;

uploadBox.addEventListener("click" ,()=>{
    fileInput.click();
});

const selectImg = (e)=>{
    const file = e.target.files[0];
    widthInput.value = "";
    heightInput.value = "";
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load" ,()=>{
        document.querySelector(".main-box").classList.add("active");
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ratioImg = previewImg.naturalWidth / previewImg.naturalHeight;
    });
}

fileInput.addEventListener("change" ,selectImg);

widthInput.addEventListener("keyup" ,()=>{
    const height = ratio.checked ? widthInput.value / ratioImg : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup" ,()=>{
    const width = ratio.checked ? heightInput.value * ratioImg : widthInput.value;
    widthInput.value = Math.floor(width);
});

download.addEventListener("click" ,()=>{
    const canva = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canva.getContext("2d");

    const imgQuality = quality.checked? 0.7 : 1.5 ;

    canva.width = widthInput.value;
    canva.height = heightInput.value;

    ctx.drawImage(previewImg ,0 ,0 ,canva.width ,canva.height);
    a.href = canva.toDataURL("image/jpeg" ,imgQuality);
    a.download = new Date().getTime();
    a.click();
})