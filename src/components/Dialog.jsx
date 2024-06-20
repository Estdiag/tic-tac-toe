import PropsType from 'prop-types';
import '../styles/dialog.css';

export default function Dialog({ isOpen, children }) {
  return <dialog className="dialog" open={isOpen}>{children}</dialog>;
}

Dialog.propTypes = {
  isOpen: PropsType.bool.isRequired,
  children: PropsType.node.isRequired,
};
