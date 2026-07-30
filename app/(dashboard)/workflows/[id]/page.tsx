export default async function Page(props: PageProps<"/workflows/[id]">) {
  const { id } = await props.params

  return <h1>Workflow: {id}</h1>
}
