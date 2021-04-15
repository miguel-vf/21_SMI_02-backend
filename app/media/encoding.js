
const path = require('path');
const child_process = require('child_process');

const formats = [
    ".mp4",
    ".mov",
    ".avi",
    ".wmv"
];
// Check this function!!!!
exports.normalize = (videoFileName) => {
    return new Promise((resolve, reject) => {
        const parsedFilename = path.parse(videoFileName);
        const outputFilename = `${parsedFilename.name}.mp4`;
        const outputFilenamePath = `/videos/${outputFilename}`
        const command = `ffmpeg -y -i ${videoFileName} ${outputFilenamePath}`;

        // /videos is the shared volume with nginx http server
        if (!formats.includes(parsedFilename.ext)) {
            return reject(new Error("wrong video format" ));
            }
    
            // Transcode
            child_process.exec(command, (err, stdout, stderr) => {
            if (err) {
                return reject(new Error(`Transcoding error. ${stderr}`));
            }
            resolve(outputFilenamePath);
            });
    });
}
