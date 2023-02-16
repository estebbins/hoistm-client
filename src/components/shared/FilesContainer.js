import { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap'

import FilesIndex from '../files/FilesIndex'

const FilesContainer = (props) => {
    const { user, msgAlert, files, filesError } = props
    
    console.log('files in filesContainer: ', files)

    return (
        <div className="container-fluid">
            <FilesIndex
                user={user}
                msgAlert={msgAlert}
                files={files}
                filesError={filesError}
            />
        </div>
    )
}

export default FilesContainer