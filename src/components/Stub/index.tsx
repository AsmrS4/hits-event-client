interface StubProps {
    message: string;
}
export const EmptyResult = ({ message }: StubProps) => {
    return (
        <div className='box-border flex flex-col justify-center items-center max-w-[324px] min-h-[324px] text-center mx-auto w-full p-2'>
            <h2 className='font-medium text-2xl text-neutral-500'>{message}</h2>
        </div>
    );
};
