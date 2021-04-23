const path = require('path');
const child_process = require('child_process');

const formats = [
    ".mp4",
    ".mov",
    ".avi",
    ".wmv"
];
// Check this function!!!! It works :3
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

exports.createThumbnail = (videoFileName) => {
    return new Promise((resolve, reject) => {
      const parsedFilename = path.parse(videoFileName);
      const outputFilename = `${parsedFilename.name}.jpg`
      // /videos is the shared volume with nginx http server
      const outputFilenamePath = `/images/${outputFilename}`;
      // ffmpeg command to extract a frame at the beginning of video and copy it to ${outputFilePath} 
      const command = `ffmpeg -ss 00:00:01 -i ${videoFileName} -vframes 1 -q:v 4 ${outputFilenamePath}`;

      // Encode
      child_process.exec(command, (err, stdout, stderr) => {
        if (err) {
          return reject(new Error(`Encoding error. ${stderr}`));
        }
        resolve(outputFilenamePath);
      });
    });
}
