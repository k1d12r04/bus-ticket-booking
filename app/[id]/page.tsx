const TicketSalePage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  return (
    <div>
      <h2>TicketSalePage</h2>
      <p> id: {id} </p>
    </div>
  );
};
export default TicketSalePage;
