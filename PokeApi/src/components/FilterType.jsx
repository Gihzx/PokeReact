function FilterType({
  tipos,
  tipoSelecionado,
  onSelecionarTipo
}) {

  return (

    <select
      value={tipoSelecionado}
      onChange={(e) => onSelecionarTipo(e.target.value)}
    >

      <option value="">
        Todos
      </option>

      {tipos.map((tipo) => (

        <option
          key={tipo.name}
          value={tipo.name}
        >
          {tipo.name}
        </option>

      ))}

    </select>

  )

}

export default FilterType