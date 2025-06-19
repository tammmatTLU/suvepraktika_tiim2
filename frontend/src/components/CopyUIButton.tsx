import { loadButtonElements } from "../store/slices/buttonElementsSlice";
import { loadUserPageState } from "../store/slices/userPageSlice";
import { useAppDispatch } from "../store/hooks";
interface CopyUIButtonProps {
    fromUserName: string;
}

export default function CopyUIButton(props: CopyUIButtonProps){
    const dispatch = useAppDispatch();
    const handleCopy = () => {
        // Dispatch actions to load button elements and user page state
        console.log(`Copying view from user: ${props.fromUserName}`);
        dispatch(loadButtonElements(props.fromUserName));
        dispatch(loadUserPageState(props.fromUserName));
    }
    
    return(
        <button
            className="copy-button"
            onClick={handleCopy}
            title="Kopeeri vaade"
        >
            Kopeeri vaade
        </button>
    )
}