import { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap'

import FilesIndex from '../files/FilesIndex'

const FilesContainer = (props) => {
    const { user, labels, msgAlert, files, filesError, triggerRefresh } = props
    
    console.log('files in filesContainer: ', files)

    return (
        <div className="container-fluid p-0">
            <FilesIndex
                user={user}
                msgAlert={msgAlert}
                files={files}
                filesError={filesError}
                labels={labels}
                triggerRefresh={triggerRefresh}
            />
        </div>
    )
}

export default FilesContainer