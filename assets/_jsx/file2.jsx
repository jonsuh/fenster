var Button = React.createClass({
  render: function() {
    return (
      <button className="button button--home" type="button">
        <ButtonText />
      </button>
    );
  }
});

ReactDOM.render(
  <Button />,
  document.getElementById('react-button')
);
