'use strict'
const Helpers = use('Helpers');
const Drive = use('Drive');

class ImageController {

    async fileUpload({request, response}) {
        const profilePic = request.file('file', {
            types: ['image', 'audio','pdf'],
            size: '10mb'
        })

        const timeNow = new Date()
        let fileName = profilePic.clientName.split('.')
        fileName = `${fileName[0]}_${timeNow.getTime()}.${fileName[1]}`
        // console.log(fileName);

        await profilePic.move(Helpers.publicPath('uploads'), {
            name: fileName,
            overwrite: true
        })

        if (!profilePic.moved()) {
            return response.json({
                code: 0,
                message: profilePic.error()
            })
        }

        // console.log(profilePic)
        return response.json({
            code: 1,
            data: {
                src: '/uploads/' + fileName,
                fileName: fileName,
                type: profilePic.type
            }
        })
    }
    async download ({ params, response }) {
        const filePath = Helpers.publicPath(`uploads/${params.slug}`);
        const isExist = await Drive.exists(filePath);

        if (isExist) {
            return response.download(filePath);
        }
        return 'File does not exist';
    }
}

module.exports = ImageController
