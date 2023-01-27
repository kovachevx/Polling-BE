import useVoteStore from "../store/voteStore";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classes from "./ResultsModal.module.css";
import ProgressBar from "./ProgressBar";

const ResultsModal = (props) => {
  const { resultModalProps, toggleResultsModal } = useVoteStore();

  return (
    <Modal isOpen={resultModalProps.isOpen} toggle={toggleResultsModal} modalTransition={{ timeout: 300 }}>
      <ModalHeader className="d-flex flex-row justify-content-between">
        <div className={classes.title}>
          {resultModalProps.title}
          {resultModalProps.title?.endsWith("?") ? "" : "?"}
        </div>
        <div className={classes.totalVotes}>Total votes: {resultModalProps.totalVotes}</div>
        {resultModalProps.totalVotes > 0 && (
          <div className={classes.voters}>
            Voters:{" "}
            {resultModalProps.voters.map((voter, index) => (
              <span key={index}>{resultModalProps.voters.length === index + 1 ? voter : `${voter}, `}</span>
            ))}
          </div>
        )}
      </ModalHeader>
      <ModalBody>
        <div>
          {resultModalProps.totalVotes ? (
            resultModalProps.options.map((option) => {
              return (
                <div key={option._id} className={classes.voteContainer}>
                  <div className={classes.progressBarContainer}>
                    <div className={classes.textContainer}>
                      <b>{option.text}</b>
                    </div>
                    <ProgressBar value={((option.votes / resultModalProps.totalVotes) * 100).toFixed(2)}>
                      {((option.votes / resultModalProps.totalVotes) * 100).toFixed(2)}%
                    </ProgressBar>
                    <hr />
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p>No one has voted yet! Be the first one by clicking on the Vote Button.</p>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter className={classes.modalFooter}>
        <Button className={classes.footerBtn} color="danger" onClick={toggleResultsModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ResultsModal;
