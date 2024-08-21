function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

const btnConvert = document.getElementById("btn-convert")
const btnClear = document.getElementById("btn-clear")
const inputsForm = Array.from(document.querySelectorAll(".input-form"))
const socialNetworks = ["› Youtube: ", "› Twitter: ", "› Tiktok: ", "› Instagram: ", "› Facebook: ", "› Snapchat: ", "› Website: "]

btnClear.addEventListener("click", () => {
    inputsForm.forEach((data) => {
        data.value = ""
    })
})

function createDescription(inputsData, titleData) {
    let description = ""

    inputsData.forEach((data, index) => {
        if (data.value !== "") {
            if (typeof titleData === "string") {
                description += data.value + "\n"
            } else {
                description += titleData[index].concat(data.value) + "\n"
            }
        }
    })

    return description;
}

btnConvert.addEventListener("click", () => {
    let textToCopy = `
⁕⁑ thank you for watching ⁑⁕

♫ Song: ${createDescription(inputsForm.slice(0, 1), "")}♪ Artist: ${createDescription(inputsForm.slice(1, 2), "")}
♫ Original song: ${createDescription(inputsForm.slice(2, 3), "")}

➤Artist information:

♪  ${createDescription(inputsForm.slice(1, 2), "")}
${createDescription(inputsForm.slice(3, 10), socialNetworks)}

➤ Background:
› Artist: ${createDescription(inputsForm.slice(10, 11), "")}› Artist Link: ${createDescription(inputsForm.slice(11, 12), "")}› Image Link: ${createDescription(inputsForm.slice(12, 13), "")}

Visuals made using https://musicvid.org


➤Lyrics:
${createDescription(inputsForm.slice(13, 14), "")}
    `
    copyTextToClipboard(textToCopy)
})