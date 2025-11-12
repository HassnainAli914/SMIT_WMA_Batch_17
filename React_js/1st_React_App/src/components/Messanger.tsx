
interface Props {
    messager: string
}
function Messanger({messager}: Props ) {

    return (
        <p>{messager}</p>
    )
}
export default Messanger;