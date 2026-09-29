import { Button } from 'react-bootstrap';

function SubmitButton({ children, type = 'submit', className = '' }) {
    return (
        <Button variant="primary" type={type} className={`w-100 ${className}`}>
            {children}
        </Button>
    );
}

export default SubmitButton