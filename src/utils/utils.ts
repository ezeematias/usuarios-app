export const sleep = (miliseconds:number=1000) =>  {
    return new Promise(resolve => 
        setTimeout(resolve, miliseconds)
    );
}

export const getBlob = async (image: string) => {
    return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        resolve(xhr.response);
    };
    xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", image, true);
    xhr.send(null);
})};