import  { FunctionComponent } from 'react';
import { ConfirmationModalProps } from '../../../Types/types';



export const ConfirmationModal: FunctionComponent<
	ConfirmationModalProps
> = props => {
	return (
		<section>
      <p className='text-center text-bold text-xl p-6'>{props.message}</p>
      <div className='flex justify-center items-center gap-8'>
        <button onClick={props.onConfirm} className='infoBtn'>Yes</button>
        <button onClick={props.onCancel} className='infoBtn'>No</button>
      </div>
		</section>
	);
};