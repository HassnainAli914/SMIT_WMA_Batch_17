
interface Detail {
    name: string,
    heading: string,
    hobbies: string[]
}
function Profile({ name, hobbies, heading }: Detail) {

    return (
        <>
            <p>My Name is: {name}</p>
            <p>{heading}</p>
            <p>{hobbies.join(", ")}</p>
            {/* {hobbies.map((hobby, index) => (
                <ul>
                    <li key={index}>{hobby}</li>
                </ul>
            ))} */}
        </>
    )
}

export default Profile;