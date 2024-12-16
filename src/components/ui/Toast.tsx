import React from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import { ToastMessage } from '@/types/ToastMessageType';
import { Variant } from '@/types/Variant';
import { TextVariant } from '@/types/TextVariant';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <ToastContainer position="top-end" className="p-2">
      {toasts.map((toast) => (
        <BootstrapToast
          key={toast.id}
          onClose={() => removeToast(toast.id)}
          bg={toast.variant.toLowerCase()}
          delay={5000}
          // autohide
          className={ 'border-' + toast.variant.toLowerCase()}
        >
          <BootstrapToast.Body className={'position-relative bg-white rounded'}>
            <div className="d-flex align-items-center justify-content-between px-2 py-2">
              <div className="d-flex align-items-center gap-2 bg-white ">
                <div className={(TextVariant[toast.variant]) + ' position-absolute d-flex align-items-center start-0 top-0 m-3'}>
                  <div className={ 'toast-icon me-2 rounded-circle border d-inline-flex align-items-center justify-content-center border-'+toast.variant.toLowerCase()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation" viewBox="0 0 16 16">
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z"/>
                  </svg>
                  </div>
                  <span className='fw-medium text-success text-uppercase'>{TextVariant[toast.variant]} </span>
                </div>
                <div><br /> <span className={' fs-6 ms-4'}>{toast.message}</span></div>
              </div>
              
              <button 
                type="button" 
                className="btn-close position-absolute top-0 end-0 m-3" 
                onClick={() => removeToast(toast.id)}
                aria-label="Close"
              />
            </div>
          </BootstrapToast.Body>
        </BootstrapToast>
      ))}
    </ToastContainer>
  );
};

export default Toast;