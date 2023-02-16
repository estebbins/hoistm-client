import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import EditContributorModal from './EditContributorModal.js'    
import ShowContributor from './ShowContributor.js'

const ContributorsIndex = (props) => {
    const { file, user, msgAlert, triggerRefresh } = props

    // const [editContributorModalShow, setEditContributorModalShow] = useState(false)
    const [contributor, setContributor] = useState(false)

    // const onClick = (e) => {
    //     e.preventDefault()
    //     const selectedCont = JSON.parse(e.target.value)
    //     console.log('parsed cont', selectedCont)
    //     setContributor(prevContributor => selectedCont)
    //     console.log('etarget', e.target.value)
    //     setEditContributorModalShow(true)
    //     console.log('contributor', contributor)
    // }
    // useEffect(() => {
    //     console.log('useeffect', contributor)
    //     setContributor(contributor)
    //         .then(()=> triggerRefresh())
    // }, [])

    let contributorList
    if (file) {
        if (file.contributors.length > 0) {
            contributorList = file.contributors.map(cont => (
                <ShowContributor 
                    key={cont._id}
                    contributor={cont}
                    user={user}
                    file={file}
                    msgAlert={msgAlert}
                    triggerRefresh={triggerRefresh}
                />
                )    
            )
        }
    }
    // if (file) {
    //     if (file.contributors.length > 0) {
    //         contributorList = file.contributors.map(cont => {
    //             if (cont.permissionLevel === 'read and write') {
    //                 styleContributorButton = {
    //                     backgroundColor: 'green'
    //                 }
    //             } else if (cont.permissionLevel === 'read only') {
    //                 styleContributorButton = {
    //                     backgroundColor: 'orange'
    //                 }
    //             }
    //             console.log('map cont', cont)
    //             return <Button className="m-2" type="submit" key={cont._id} value={JSON.stringify(cont)} style={styleContributorButton} onClick={onClick}>{cont.userRef.email}</Button>
    //         })
    //     }
    // }

    return (
        <>
            <div>
                {contributorList}
            </div>
            {/* <EditContributorModal
                user={user}
                file={file}
                contributor={contributor}
                show={editContributorModalShow}
                handleClose={() => setEditContributorModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            /> */}
        </>
    )
}

export default ContributorsIndex
