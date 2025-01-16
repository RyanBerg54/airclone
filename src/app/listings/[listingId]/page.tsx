import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingsById"
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"

type TParams={
  listingId?:string
}

const ListingPage = async ({params}:{params:TParams}) => {
 
  const listing= await getListingById(params)
  const currentUser= await getCurrentUser()

  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
  <ClientOnly>
    
      <ListingClient listing={listing} currentUser={currentUser}/>
  </ClientOnly>
  )
    
}

export default ListingPage
