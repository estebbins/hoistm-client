import { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap'
import { getAllFiles } from '../../api/files'

import FilesIndex from '../files/FilesIndex'

const FilesContainer = (props) => {
    const { user, updatedFiles, labels, msgAlert, triggerRefresh } = props
    
    // console.log('files in filesContainer: ', files)

    const [files, setFiles] = useState(null)
	const [filesError, setFilesError] = useState(false)

    useEffect(() => {
        getAllFiles(user)
            .then(res => setFiles(res.data.files))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting files',
                    message: 'failed to get files',
                    variant: 'danger'
                })
                setFilesError(true)
            })
    }, [updatedFiles])

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