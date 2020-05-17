<?php

namespace App\Http\Controllers;
use App\Feedback;
use App\Listentry;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

use App\Shoppinglist;
use phpDocumentor\Reflection\Types\Null_;

class ShoppinglistController extends Controller
{
    public function index() {
        $lists = Shoppinglist::with(['listentries', 'creator', 'helper', 'feedbacks'])->get();
        return $lists;
    }

    public function findListById(int $id){
        // Bei First im SL-Details res[0] weggeben
        $lists = Shoppinglist::where('id', $id)->with(['listentries', 'creator', 'helper', 'feedbacks'])->first();
        //$lists = Shoppinglist::where('id', $id)->with(['listentries', 'creator', 'helper', 'feedbacks'])->get();
        return $lists;
    }

    public function findUserById(int $id){
        $users = User::where('id', $id)->first();
        return $users;
    }

    public function findListByCreatorId(int $id){
        $lists = Shoppinglist::where('creator_id', $id)->with(['listentries', 'creator', 'helper', 'feedbacks'])->get();
        return $lists;
    }

    public function findListByHelperId(int $id){
        $lists = Shoppinglist::where('helper_id', $id)->with(['listentries', 'creator', 'helper', 'feedbacks'])->get();
        return $lists;
    }

    public function findListWithoutHelperId(){
        $lists = Shoppinglist::whereNull('helper_id')->with(['listentries', 'creator', 'helper', 'feedbacks'])->get();
        return $lists;
    }

    public function checkId(int $id){
        $lists = Shoppinglist::where('id', $id)->first();
        return $lists  != null ? response()->json('Yes, list ' . $id . ' exists! :)', 200) :
            response()->json('No, list ' . $id . ' does not exist. :(', 404);
    }

    public function saveList(Request $request): JsonResponse {

        //var_dump($request->all()); die();
        DB::beginTransaction();
        try{
            $shoppinglist = Shoppinglist::create($request->all());
            if(isset($request['listentries']) && is_array($request['listentries']) ){
                foreach ($request['listentries'] as $lentry){
                    $listentry = Listentry::firstOrNew(['description' => $lentry['description'],
                        'amount' => $lentry['amount'], 'max_price' => $lentry['max_price'] ]);
                    $shoppinglist->listentries()->save($listentry);
                }
            }

            if (isset($request['feedbacks']) && is_array($request['feedbacks'])) {
                foreach ($request['feedbacks'] as $fb ) {
                    $feedback = Feedback::firstOrNew([ 'body'=>$fb['body'], 'user_id'=> $fb['user_id'] ]);
                    $shoppinglist->feedbacks()->save($feedback);
                }
            }

            DB::commit();
            return response()->json($shoppinglist, 201);
        }

        catch(\Exception $e) {
            DB::rollBack();
            return response()->json("saving list failed: " . $e->getMessage(), 420);
        }
    }

    public function updateList(Request $request, int $id) {
        DB::beginTransaction();
        try {
            $shoppinglist = Shoppinglist::with(['listentries', 'creator', 'helper', 'feedbacks'])->where('id', $id)->first();
            if($shoppinglist != null){
                $request = $this->parseRequest( $request );
                $shoppinglist->update($request->all());
                $shoppinglist->listentries()->delete();
                if(isset($request['listentries']) && is_array($request['listentries']) ){
                    foreach ($request['listentries'] as $lentry){
                        $listentry = Listentry::firstOrNew(['description' => $lentry['description'],
                            'amount' => $lentry['amount'], 'max_price' => $lentry['max_price'] ]);
                        $shoppinglist->listentries()->save($listentry);
                    }
                }
                $shoppinglist->save();
            }

            DB::commit();
            $shoppinglist1 = Shoppinglist::with(['listentries', 'creator', 'helper', 'feedbacks'])->where('id', $id)->first();
            return response()->json($shoppinglist1 ,201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("updating list failed: " . $e->getMessage(), 420);
        }
    }

    public function saveFeedback(Request $request, int $id){
        DB::beginTransaction();
        //$feedback = Feedback::create($request->all());
        //$shoppinglist = Shoppinglist::with(['listentries', 'creator', 'helper', 'feedbacks'])->where('id', $id)->first();
        try {
            $shoppinglist = Shoppinglist::with(['listentries', 'creator', 'helper', 'feedbacks'])->where('id', $id)->first();
            $feedback = Feedback::create($request->all());
            if($shoppinglist != null){
                $request = $this->parseRequest( $request );
                // save feedback
                if(isset($request)  ){
                    $feedback = Feedback::firstOrNew(['body' => $request['body'],'user_id' => $request['user_id'] ]);
                    $shoppinglist->feedbacks()->save($feedback);
                }
                $shoppinglist->save();
            }
            DB::commit();
            return response()->json($shoppinglist);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("Saving feedback failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(int $id) {
        $shoppinglist = Shoppinglist::where( 'id' , $id )->first();
        if ( $shoppinglist != null ) {
            $shoppinglist->delete();
        }
        else {
            throw new \Exception ("List could not be deleted - it does not exist");
        }
        return response ()-> json ( 'List (' . $id . ') successfully deleted' , 200 );
    }

    private function parseRequest(Request $request) : Request {
        $date = new \DateTime($request->bought_until);
        $request['bought_until'] = $date;
        return $request;
    }

    public function show(Shoppinglist $shoppinglist){
        //$list = Shoppinglist::find($shoppinglist);
        return view('shoppinglists.showlists', compact('list'));
    }
}
