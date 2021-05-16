// Scenario
/*
    
        Query all Search engines APIs for a string
        Send the results to a service to return the best one
    
*/
namespace fetchPure {

        type SearchEngineResult = "cool" | "not cool"
        type SearchEngineResponse = {}

        function buildRequestsForSearchString(searchTerm: string): RequestInfo[] {
                // build requests for all supported search engines
                return [`https://google.com?query=${searchTerm}`, `https://bing.com?query=${searchTerm}`]
        }

        function processSearchEngineResult(response: SearchEngineResponse): SearchEngineResult {
                // do evaluation of the response
                // - which engine is it coming from
                // - what is in it
                // - decide if it's a result or an error/no result
                return "cool"
        }

        async function main(args: string[]) {
            let urls = buildRequestsForSearchString(args.join(","))
            let requestResults = await Promise.allSettled(urls.map(async url=>processSearchEngineResult(await fetch(url))))
            let badOnes = requestResults.filter(result=> result.status == "rejected" || result.value == "not cool")
            let goodOnes = requestResults.filter(result=> result.status == "fulfilled" && result.value == "cool")
            console.error(badOnes)
            console.info(goodOnes)
        }
}
